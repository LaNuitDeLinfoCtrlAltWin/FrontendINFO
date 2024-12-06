<template>
    <image :src="imageSrc"></image>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import QRCode from 'qrcode';

    const imageSrc = ref('a');

  async function scaleImage(url: string, maxDimension: number = 400): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image from ${url}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const img = new Image();
                    const reader = new FileReader();

                    reader.onload = () => {
                        if (typeof reader.result !== "string") {
                            reject("pas de string");
                            return;
                        }

                        img.src = reader.result;
                    };

                    img.onload = () => {
                        const aspectRatio = img.width / img.height;
                        let newWidth: number, newHeight: number;

                        if (img.width > img.height) {
                            newWidth = maxDimension;
                            newHeight = maxDimension / aspectRatio;
                        } else {
                            newHeight = maxDimension;
                            newWidth = maxDimension * aspectRatio;
                        }
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");

                        if (!ctx) {
                            reject("Canvas context could not be created.");
                            return;
                        }

                        canvas.width = img.width;
                        canvas.height = img.height;

                        ctx.drawImage(img, 0, 0);

                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imageData.data;

                        for (let i = 0; i < data.length; i += 4) {
                            const alpha = data[i + 3];

                            if (alpha > 0) {
                                const randomValue = Math.random() < 0.5 ? 0 : 255;

                                data[i] = randomValue; 
                                data[i + 1] = randomValue;
                                data[i + 2] = randomValue;
                            }
                        }

                        ctx.putImageData(imageData, 0, 0);

                        const scaledCanvas = document.createElement("canvas");
                        const scaledCtx = scaledCanvas.getContext("2d");

                        if (!scaledCtx) {
                            reject("Scaled canvas context could not be created.");
                            return;
                        }

                        scaledCanvas.width = newWidth;
                        scaledCanvas.height = newHeight;

                        scaledCtx.drawImage(canvas, 0, 0, newWidth, newHeight);

                        resolve(scaledCanvas.toDataURL("image/png"));
                    };

                    img.onerror = () => reject("Failed to load the image.");
                    reader.onerror = () => reject("Failed to read the image blob.");

                    reader.readAsDataURL(blob);
                })
                .catch(err => reject(err.message));
        });
    }

    async function addQRCodeToShape(base64Image: string, qrText: string): Promise<string> {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context is not available');
        }

        const img = new Image();
        img.src = base64Image;

        return new Promise<string>((resolve, reject) => {
            img.onload = async () => {
                
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                const qrCanvas = document.createElement('canvas');
                qrCanvas.width = 70; // QR Code size
                qrCanvas.height = 70;

                try {
                    await QRCode.toCanvas(qrCanvas, qrText, {
                        width: 70,
                        height: 70,
                        margin: 0,
                    });
                } catch (err) {
                    reject(`QR Code generation failed: ${err}`);
                    return;
                }

                const centerX = (canvas.width - qrCanvas.width) / 2;
                const centerY = (canvas.height - qrCanvas.height) / 2;

                ctx.drawImage(qrCanvas, centerX, centerY, qrCanvas.width, qrCanvas.height);

                const finalBase64 = canvas.toDataURL();
                resolve(finalBase64);
            };

            img.onerror = () => reject('Failed to load Base64 image.');
        });
    }

    (async () => {
        const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png";
        const QrUrl = "https://google.com";
        try {
            const base64Image = await scaleImage(imageUrl, 400);
            const resultBase64 = await addQRCodeToShape(base64Image, QrUrl);
            imageSrc.value = resultBase64;
        } catch (error) {
            console.error("Error:", error);
        }
    })();
</script>