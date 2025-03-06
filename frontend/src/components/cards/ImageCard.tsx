import {Box} from "@mui/material";

type Props = {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    borderRadius?: number | string;
    boxShadow?: number | string;
};

const ImageCard = ({
                       src, alt = "Image", width = "100%", height = "auto",
                       borderRadius = "5px", boxShadow = "none"
                   }: Props) => {
    return (
        <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
                width,
                height,
                borderRadius,
                boxShadow,
                objectFit: "cover",
            }}
        />
    );
};

export default ImageCard;