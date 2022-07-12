import { NextPage } from "next";
import { getImageSize } from "next/dist/server/image-optimizer";
import { useRef, useEffect, ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";

const Main: NextPage = () => {
    // 出力する画像のURLを入れる変数
    const [imageURLs, setImageURLs] = useState<string[]>([])
    // canvasの要素を所得
    const canvasRef = useRef(null);
    // canvasRefからgetContextを返す関数
    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;
        const toData = canvas.toDataURL();
        return canvas.getContext('2d');
    }
    // canvasRefの要素をそのまま返す関数
    const getCanvas = ()=> {
        const canvas: any = canvasRef.current;
        return canvas;
    }
    // ↓画像ファイルのonChangeで使用
    // 選択された画像ファイルのObjectURLを突っ込んだImageオブジェクトを返す関数
    const setNewImage = (e: ChangeEvent<HTMLInputElement>): HTMLImageElement => {
        const newImage = new Image;
        const ctx = getCanvas();
        if(e.target.files){
            const imageURL: string = window.URL.createObjectURL(e.target.files[0])
            setImageURLs((prev) => {
                return [...prev, imageURL]
            });
            newImage.src = imageURL;
        }
        return newImage;
    }
    // onChange毎にsetImageで取得した画像を描写する関数
    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const ctx: CanvasRenderingContext2D = getContext();
        const img = setNewImage(e);
        img.onload = () => {
            ctx.drawImage(img,0,0);
        }
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
                {imageURLs.map((URL: string) =>
                    <img key={URL} src={URL} alt="" />
                )}

            </div>
        </main>
    );
}

export default Main;


