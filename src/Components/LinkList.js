export default function LinkList(props) {
  const deleteLink = (index) => {
    props.onDeleteLinkButton(index);
  };
  return (
    <>
      {props.links && props.links.length > 0
        ? props.links.map((link, i) => (
            <div key={i}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {" "}
                {link.name}{" "}
              </a>

              {link.tags && link.tags.length > 0
                ? link.tags.map((tag, i) => <span key={i}> {tag.name} </span>)
                : "No tags present"}

              <button
                onClick={() => {
                  console.log("clicked delete item");
                  deleteLink(i);
                }}
                key={i}
              >
                {" "}
                Delete link{" "}
              </button>
            </div>
          ))
        : "No links present"}
    </>
  );
}
