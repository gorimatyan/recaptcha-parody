import { NextPage } from "next";
import { getImageSize } from "next/dist/server/image-optimizer";
import { useRef, useEffect, ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";

const Main: NextPage = () => {
    // const outputArea:any = useRef();
    console.log("関数が呼ばれた");
    
    const canvasRef: any = useRef();
    const [imagesURLs, setImagesURL] = useState<string[]>([]);
    // const img: HTMLElement = new Image();
    // ↓canvasの状態を保持
    const [canvas, setCanvas] = useState<CanvasRenderingContext2D>();
    let imagesAllURLs = imagesURLs;
    useEffect(() => {
        // output先のdivを取得
        // console.log(outputArea.current)
        setCanvas(canvasRef.current.getContext("2d"))
        
    }, [])
    useEffect(()=> {
        imagesAllURLs = imagesURLs;
        console.log("useEffectが呼ばれた");
        console.log(imagesURLs);
        console.log(imagesAllURLs);

    },[imagesURLs])

    async function handleFiles(e: ChangeEvent<HTMLInputElement>) {
        // 選択されたファイルを取得
        const img = new Image();
        if (e.currentTarget.files) {
            // 選択されたファイルのURLを取得
            img.src = window.URL.createObjectURL(e.currentTarget.files[0]);

            if (canvas) {
                img.onload = () => {
                    return canvas.drawImage(img, 0, 0, 30, 330);
                }
            }
            let a = document.getElementById("canvas");
            
            let url: string = a.toDataURL();
            // await setImagesURL((prev): string[] => {
            //     return [...prev, url]
            // })
            const func =  [...imagesURLs, url];
                
                setImagesURL(func)
            console.log("handleFiles")

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
                {imagesAllURLs.map((URL: string): any => 
                    <img key={URL} src={URL} alt="" />
                )}
                
            </div>
        </main>
    );
}

export default Main;


