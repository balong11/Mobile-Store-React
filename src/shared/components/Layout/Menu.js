import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../services/Api";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data.data.docs))
      .catch((err) => console.log(err));
  }, []);
  return (
    <nav>
      <div id="menu" className="collapse navbar-collapse">
        <ul>
          {categories.map((item, index) => (
            <li key={index} className="menu-item">
              <Link to={`/Category-${item._id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
