import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

// Component AddButton
export default function AddButton(props) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [tags, setTags] = useState([]);
  const [url, setURL] = useState("");

  // Function
  const addLink = () => {
    props.onAddLinkProps(name, url, tags);
    setModal(false);
    setName("");
    setURL("");
    setTags([]);
  };

  //Function
  const onTagChange = (i, e) => {
    const newTags = tags.slice();
    newTags[i] = {
      name: e.currentTarget.value,
    };
    setTags(newTags);
  };

  // Component AddButton outcome
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          console.log("clicked");
          setModal(!modal);
        }}
      >
        {" "}
        Add item{" "}
      </Button>

      <Modal show={modal}>
        <Modal.Header>
          {" "}
          <b>ADD WATCH DETAILS</b>
        </Modal.Header>
        <Modal.Body>
          <label>MODEL</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <br />
          <label>URL</label>
          <br />
          <input
            type="text"
            value={url}
            onChange={(e) => setURL(e.currentTarget.value)}
          />
          <br />
          <label variant="light">TAGS:</label>
          <br />
          {/* Do not need the inline conditional? */}
          {tags && tags.length > 0
            ? tags.map((tag, i) => {
                return (
                  <input
                    key={i}
                    type="text"
                    value={tag.name}
                    onChange={(e) => onTagChange(i, e)}
                  />
                );
              })
            : "No Tags"}
          <br />
          <Button
            variant="dark"
            onClick={() => setTags(tags.concat([{ name: "" }]))}
          >
            <b>Add Tag</b>
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={addLink}>
            <b>Submit</b>
          </Button>
          <Button variant="dark" onClick={() => setModal(!modal)}>
            <b>Cancel</b>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
