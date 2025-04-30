import React, { useEffect } from 'react';

function Contact() {
    useEffect(() => {
        // Load Instagram's embed.js script after the component mounts
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <h2>Contact Information</h2>
                <p>Email: ibozinovskaib@gmail.com</p>
                <p>Phone: +389 78 433 360</p>
                <p>Address: Ul. 42, br.30 Karpos</p>

                {/* Google Map Embed */}
                <h3>Our Location</h3>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d739.3894496658195!2d21.73432446970953!3d42.159748692330005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135451bf98d54cfb%3A0x2f9e935e4097f120!2sul.42%2C%20Kumanovo!5e0!3m2!1sen!2smk!4v1746008017294!5m2!1sen!2smk"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                loading="lazy"
                ></iframe>
            </div>

            <div style={styles.rightSection}>
                <h2>Instagram Profile</h2>
                {/* Instagram Embed without Caption */}
                <blockquote
                    className="instagram-media"
                    data-instgrm-permalink="https://www.instagram.com/p/CuwTnMTrhY7/?utm_source=ig_embed&utm_campaign=loading"
                    data-instgrm-version="14"
                    style={styles.instagramEmbed}
                >
                    <div style={{ padding: '16px' }}>
                        <a
                            href="https://www.instagram.com/p/CuwTnMTrhY7/?utm_source=ig_embed&utm_campaign=loading"
                            style={styles.instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div style={styles.instagramProfile}>
                                <div style={styles.instagramProfilePic}></div>
                                <div style={styles.instagramProfileText}>
                                    <div style={styles.instagramUsername}></div>
                                    <div style={styles.instagramPostInfo}></div>
                                </div>
                            </div>
                            <div style={{ padding: '19% 0' }}></div>
                            <div style={styles.instagramIconWrapper}>
                                <svg width="50px" height="50px" viewBox="0 0 60 60">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                                            <path
                                                d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41"
                                                fill="#F4F4F4"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </a>
                    </div>
                </blockquote>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        gap: '20px',
        flexWrap: 'wrap', // Allow wrapping on smaller screens
    },
    leftSection: {
        flex: 1,
        paddingRight: '20px',
        minWidth: '300px', // Prevent shrinking too much on mobile
        maxWidth: '600px', // Limit width on larger screens
    },
    rightSection: {
        flex: 1,
        paddingLeft: '20px',
        minWidth: '300px', // Prevent shrinking too much on mobile
        maxWidth: '600px', // Limit width on larger screens
    },
    instagramEmbed: {
        background: '#FFF',
        border: 0,
        borderRadius: '3px',
        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
        margin: '1px',
        maxWidth: '540px',
        minWidth: '100%', // Make Instagram embed full width
        width: '100%',
    },
    instagramLink: {
        background: '#FFFFFF',
        lineHeight: 0,
        padding: 0,
        textAlign: 'center',
        textDecoration: 'none',
        width: '100%',
    },
    instagramProfile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    instagramProfilePic: {
        backgroundColor: '#F4F4F4',
        borderRadius: '50%',
        flexGrow: 0,
        height: '40px',
        marginRight: '14px',
        width: '40px',
    },
    instagramProfileText: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
    },
    instagramUsername: {
        backgroundColor: '#F4F4F4',
        borderRadius: '4px',
        height: '14px',
        marginBottom: '6px',
        width: '100px',
    },
    instagramPostInfo: {
        backgroundColor: '#F4F4F4',
        borderRadius: '4px',
        height: '14px',
        width: '60px',
    },
    instagramIconWrapper: {
        display: 'block',
        height: '50px',
        margin: '0 auto 12px',
        width: '50px',
    },
    '@media screen and (max-width: 768px)': {
        container: {
            flexDirection: 'column',
            gap: '20px',
        },
        leftSection: {
            paddingRight: 0,
        },
        rightSection: {
            paddingLeft: 0,
        },
    },
};

export default Contact;

