import { NextPage } from "next";
import { getImageSize } from "next/dist/server/image-optimizer";
import { useRef, useEffect, ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";

const Main: NextPage = () => {
    const canvasRef = useRef(null);
    const getContext = (): CanvasRenderingContext2D => {
       const canvas: any = canvasRef.current;

       return canvas.getContext('2d');
    }
    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const ctx: CanvasRenderingContext2D = getContext();
        // ctx.drawImage();
    }
    const getNewImage = () => {
        const newImage = new Image;

        return newImage;
    }

    return (
        <main>
            <p className="text-xl font-bold underline">タイトル</p>
            <p>の画像をすべて選択してください。</p>

            <input type="file" name="files" onChange={(e) => { handleFiles(e) }} multiple />

            <div className="editArea">
                <canvas
                    id="canvas"
                    ref={canvasRef}
                    width="330"
                    height="330"
                    className="bg-gray-400"
                >
                </canvas>
            </div>

            <div className="outputArea">
                {imagesAllURLs.map((URL: string): any => 
                    <img key={URL} src={URL} alt="" />
                )}
                
            </div>
        </main>
    );
}

export default Main;


