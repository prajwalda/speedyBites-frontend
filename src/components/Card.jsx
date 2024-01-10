import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { FaShoppingCart } from "react-icons/fa";
import { useDispacthCart, useCart } from "./ContextReducer";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const MediaCard = (props) => {
  let dispatch = useDispacthCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
           
        });
        return
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
           
        });
        return
      }
      return

    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }} className="bg-dark">
      <CardMedia sx={{ height: 150 }} image={props.foodItem.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.foodItem.name}
          <Typography>₹{finalPrice}/-</Typography>
        </Typography>
        <Typography variant="body2" color="text.white">
          {props.foodItem.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <select
          className="m-2 h-100 rounded bg-success"
          style={selectStyle}
          onChange={(e) => setQty(e.target.value)}
        >
          {Array.from(Array(6), (e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          className="m-2 h-100 rounded bg-success"
          ref={priceRef}
          style={selectStyle}
          onChange={(e) => setSize(e.target.value)}
        >
          {priceOptions.map((data) => (
            <option value={data} key={data}>
              {data}
            </option>
          ))}
        </select>
      </CardActions>
      <hr />
      <Typography
        className="btn bg-success container"
        onClick={handleAddToCart}
        style={selectStyle}
      >
        Add to Cart
      </Typography>
    </Card>
  );
};

// Custom styles for the select tag
const selectStyle = {
  padding: "8px",
  fontSize: "14px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#28a745",
  color: "#fff",
  cursor: "pointer",
};

export default MediaCard;
