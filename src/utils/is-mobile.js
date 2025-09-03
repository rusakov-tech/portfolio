export function isMobile() {
    if (navigator.userAgentData) {
        return navigator.userAgentData.mobile;
    }

    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
