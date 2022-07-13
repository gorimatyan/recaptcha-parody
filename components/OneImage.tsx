import { NextPage } from "next";

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
type Props = {
    imageURLs: imageURLs[];
}


const OneImage: NextPage<Props> = (props) => {
    return (
        <div>
            1枚です
            <div className="outputArea">
                {props.imageURLs.map((imageURL: any) =>
                    <img key={imageURL.id} src={imageURL.url} className="image w-10 h-10" />
                )}
            </div>
        </div>
    );
}

export default OneImage;