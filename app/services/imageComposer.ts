export async function composeImageWithBackground(
  foregroundUrl: string,
  backgroundUrl: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    const foregroundImg = new Image();
    const backgroundImg = new Image();

    foregroundImg.crossOrigin = "anonymous";
    backgroundImg.crossOrigin = "anonymous";

    let foregroundLoaded = false;
    let backgroundLoaded = false;

    const checkIfBothLoaded = () => {
      if (foregroundLoaded && backgroundLoaded) {
        try {
          canvas.width = foregroundImg.width;
          canvas.height = foregroundImg.height;

          ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

          ctx.drawImage(foregroundImg, 0, 0);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = window.URL.createObjectURL(blob);
                resolve(url);
              } else {
                reject(new Error("Failed to create blob from canvas"));
              }
            },
            "image/png",
            1.0
          );
        } catch (error) {
          reject(error);
        }
      }
    };

    foregroundImg.onload = () => {
      foregroundLoaded = true;
      checkIfBothLoaded();
    };

    backgroundImg.onload = () => {
      backgroundLoaded = true;
      checkIfBothLoaded();
    };

    foregroundImg.onerror = () => {
      reject(new Error("Failed to load foreground image"));
    };

    backgroundImg.onerror = () => {
      reject(new Error("Failed to load background image"));
    };

    foregroundImg.src = foregroundUrl;
    backgroundImg.src = backgroundUrl;
  });
}
