import { NextPage } from "next";
import { getImageSize } from "next/dist/server/image-optimizer";
import { useRef, useEffect, ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";

const Main: NextPage = () => {
    // 編集後の出力する画像のURLを入れる変数
    const [imageURLs, setImageURLs] = useState<string[]>([])
    // 選択されたファイル
    const [file, setFile] = useState("");
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
        // 画像のオブジェクトを生成
        const newImage = new Image;

        // 画像ファイルのURLをnewImageのsrcにブチ込む処理
        if(e.target.files){
            const imageURL: string = window.URL.createObjectURL(e.target.files[0])
            newImage.src = imageURL;
        }else{
            
        }
        return newImage;
    }
    // onChange毎にsetImageで取得した画像を描写する関数
    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const ctx: CanvasRenderingContext2D = getContext();
        const img = setNewImage(e);
        img.onload = () => {
            ctx.drawImage(img,0,0,30,30);
        }
    }
    // const setEditedImage = (e: ChangeEvent<HTMLInputElement>,imageURL: string) => {
    //     // 画像ファイルのURLをnewImageのsrcにブチ込む処理
    //     if(e.target.files){
    //         // const imageURL: string = window.URL.createObjectURL(e.target.files[0])
    //         setImageURLs((prev) => {
    //             return [...prev, imageURL]
    //         });
    //     }
    // }
    const setEditedImage = () => {
            // const imageURL: string = window.URL.createObjectURL(e.target.files[0])
            const canvas = getCanvas();
            canvas.toBlob((blob: Blob | MediaSource)=> {
                const imageURL = URL.createObjectURL(blob);
                setImageURLs((prev) => {
                    return [...prev, imageURL]
                });
            })

    }
    const getCanvasBlob = (): string => {
        const canvas = getCanvas();
        return canvas.toBlob((blob: Blob | MediaSource)=> {
            const imageURL = URL.createObjectURL(blob);

            return imageURL;
        })
    }
    console.log(imageURLs);
    

    return (
        <main>
            <p className="text-xl font-bold underline">タイトル</p>
            <p>の画像をすべて選択してください。</p>

            <label htmlFor="fileUpload">
                画像を選択
            </label>
                <input id="fileUpload" type="file" name="files" onChange={(e) => { handleFiles(e) }} value="" hidden />

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
            <button onClick={setEditedImage}>
                確定
            </button>

            <div className="outputArea">
                {imageURLs.map((URL: string, i) =>
                    <img key={i} src={URL} alt="" />
                )}

            </div>
        </main>
    );
}

export default Main;


