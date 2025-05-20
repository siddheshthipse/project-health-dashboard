import React from 'react';
import { useState } from 'react';

import VerticalNavigation from './VerticalNavigation';

const ProjectHealthDashboard = () => {
    const [headerExpanded, setHeaderExpanded] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => {
                console.log(`Error attempting to enable full-screen mode: ${e.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        // Use the vertical navigation component instead of the horizontal header
        <VerticalNavigation 
            isFullScreen={isFullScreen} 
            toggleFullScreen={toggleFullScreen}
        >
        </VerticalNavigation>
    );
};

export default ProjectHealthDashboard;