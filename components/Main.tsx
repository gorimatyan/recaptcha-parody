import { NextPage } from "next";
import { getImageSize } from "next/dist/server/image-optimizer";
import { useRef, useEffect, ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import NineImages from "./NineImages";
import OneImage from "./OneImage";
import SixteenImages from "./SixteenImages";

type Props = {
    type: number;
}

const Main: NextPage<Props> = (props) => {
    // 編集後の出力する画像のURLを入れる変数
    type imageURLs = [
        {
            id: number;
            url: string;
        }
    ]
    type imageURL = {
        id: number;
        url: string;
    }
    const [imageURLs, setImageURLs] = useState<imageURLs[]>([])
    // canvasの要素を所得
    const canvasRef = useRef(null);
    // canvasRefからgetContextを返す関数
    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;
        const toData = canvas.toDataURL();
        return canvas.getContext('2d');
    }
    // canvasRefの要素をそのまま返す関数
    const getCanvas = () => {
        const canvas: any = canvasRef.current;
        return canvas;
    }
    // ↓画像ファイルのonChangeで使用
    // 選択された画像ファイルのObjectURLを突っ込んだImageオブジェクトを返す関数
    const setNewImage = (e: ChangeEvent<HTMLInputElement>): HTMLImageElement => {
        // 画像のオブジェクトを生成
        const newImage = new Image;
        // 画像ファイルのURLをnewImageのsrcにブチ込む処理
        if (e.target.files) {
            const imageURL: string = window.URL.createObjectURL(e.target.files[0])
            newImage.src = imageURL;
        }
        return newImage;
    }
    // onChange毎にsetImageで取得した画像を描写する関数
    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const ctx: CanvasRenderingContext2D = getContext();
        const img = setNewImage(e);
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 330, 330,);
        }
    }

    const setEditedImage = () => {
        const canvas = getCanvas();
        canvas.toBlob((blob: Blob | MediaSource) => {
            const id = imageURLs.length;
            const url = URL.createObjectURL(blob);
            const imageURL: imageURL = {
                id: id,
                url: url
            }
            setImageURLs((prev): any => {
                return [...prev, imageURL]
            });
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
                {imageURLs.map((imageURL: any) =>
                    <img key={imageURL.id} src={imageURL.url} className="image w-10 h-10" />
                )}
            </div>
            
            <div>
                {props.type === 1 ? (<OneImage imageURLs={imageURLs} ></OneImage>) : 
                    (props.type === 9 ? (<NineImages></NineImages>) : (<SixteenImages></SixteenImages>))
                }
            </div>

        </main>
    );
}

export default Main;

{/* <img key={imageURL.id} src={imageURL.url} className="image" /> */ }

