window.currentBrackPoint = () => {
    const w = window.innerWidth;

    if (w < 640) return "NONE"
    if (640 <= w && w < 768) return "sm"
    if (768 <= w && w < 1024) return "md"
    if (1024 <= w && w < 1280) return "lg"
    if (1280 <= w && w < 1536) return "xl"
    if (1536 <= w) return "xl"

}