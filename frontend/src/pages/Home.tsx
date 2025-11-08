import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Modal from "../components/Modal";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <h1>Upload a file</h1>
        <FileUploader />
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        footer={<button onClick={() => setIsOpen(false)}>Close</button>}
      >
        <p>This is the content of the modal</p>
      </Modal>
    </>
  );
}

export default Home;
