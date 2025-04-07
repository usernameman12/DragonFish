window.onload = function() {
    setTimeout(function() {
        document.getElementById('loadingScreen').style.opacity = '0';
        document.getElementById('mainContent').style.opacity = '1';
        

        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none'
            detectDevice();
        }, 500);
    }, 1500);
};

function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const deviceInfo = document.getElementById('device-info-text');

    deviceInfo.innerHTML = '<i class="fas fa-search icon"></i> Scanning your device config...';
    
    setTimeout(() => {
        if (isMobile) {
            deviceInfo.innerHTML = '<i class="fas fa-mobile-alt icon"></i> Mobile device detected. Redirecting...';
            setTimeout(() => {
                window.location.href = '../src/mobile.html';
            }, 1500);
        } else {
            deviceInfo.innerHTML = '<i class="fas fa-desktop icon"></i> Desktop device detected. Redirecting...';
            setTimeout(() => {
                window.location.href = '../src/computer.html';
            }, 1500);
        }
    }, 1000);
}