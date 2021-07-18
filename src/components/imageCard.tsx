export default function ImageCard(props: any) {
  const onRowClick = (event: any) => {
    const imageIndex = event.target.id;
    props.openCarousel(imageIndex);
  }

  return (
    <div className="image-outer">
      <img className="image-card" id={props.imageIndex} src={props.imageUrl} onClick={onRowClick} alt=''/>
    </div>
  )
}