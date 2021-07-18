import { forwardRef, useState } from "react";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import ImageGallery from 'react-image-gallery';

import ImageCard from "./imageCard";
import Pagination from "./pagination";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { DialogContent } from "@material-ui/core";

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Gallery() {
  const [galleryPhotos, setGalleryPhotos]: any[] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMacintosheGroupPhotos = async (pageNo: number, noOfPhotos: number) => {
    const {
      REACT_APP_FLICKR_BASE_URL,
      REACT_APP_MACINTOSHE_GROUP_ID,
      REACT_APP_FLICKER_API_KEY,
    } = process.env;
    const getPhotosUrl = `${REACT_APP_FLICKR_BASE_URL}?method=flickr.groups.pools.getPhotos&api_key=${REACT_APP_FLICKER_API_KEY}&group_id=${REACT_APP_MACINTOSHE_GROUP_ID}&per_page=${noOfPhotos}&page=${pageNo}&format=json&nojsoncallback=1`;

    const photos = await axios.get(getPhotosUrl);
    const { photo } = photos.data.photos;

    setImageUrls(photo.map((photoDetails: any) => {
      const { id, secret, server } = photoDetails;
      return { original: `https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg`,
      thumbnail: `https://live.staticflickr.com/${server}/${id}_${secret}_t.jpg` };
    }));

    setGalleryPhotos(photo);
    setTotalPages(photos.data.photos.pages);
  };

  const renderGallery = () => {
    return galleryPhotos.map((photoDetails: any, index: number) => {
      const { id, secret, server } = photoDetails;
      const imageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_t.jpg`;

      return (
        <ImageCard
          key={index}
          imageUrl={imageUrl}
          imageIndex={index}
          openCarousel={openCarousel}
        />
      );
    });
  };

  const openCarousel = (index: number) => {
    setImageIndex(+index);
    handleClickOpen();
  }

  return (
    <div className="gallery-container">
      <div className="gallery-outer">{renderGallery()}</div>
      <Pagination
        getMacintosheGroupPhotos={getMacintosheGroupPhotos}
        totalPages={totalPages}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      > 
       <DialogContent>
        <ImageGallery items={imageUrls} startIndex={imageIndex} />;
        </DialogContent>
      </Dialog>
    </div>
  );
}
