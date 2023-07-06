import "./Footer.css";
import { BiSolidTrashAlt } from "react-icons/bi";

const Footer = ({ handleDeleteSelected }) => {
  
  return (
    <div>
      <button className="delete-button" onClick={handleDeleteSelected}>
        <span>Delete Selected</span>
        <span className="icon-trash">
          <BiSolidTrashAlt />
        </span>
      </button>
    </div>
  );
};

export default Footer;
