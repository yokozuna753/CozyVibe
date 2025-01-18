import { useState } from "react";
import { createSpot } from "../../store/spots";
import { createSpotImage } from "../../store/spotImages";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FunctionContext } from "../../context/FormContext";
import './CreateASpot.css'

// i set a handle submit function that will check for errors

function CreateASpot() {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});


  const { formType } = useContext(FunctionContext);

  const spots = useSelector((state) => state.spots);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = {};

    if (country.length < 2) validationErrors.country = "Country is required";
    if (address.length < 5) validationErrors.address = "Address is required";
    if (city.length < 1) validationErrors.city = "City is required";
    if (state.length < 2) validationErrors.state = "State is required";
    if (description.length < 30)
      validationErrors.description =
        "Description needs a minimum of 30 characters";
    if (name.length < 1) validationErrors.name = "Name is required";
    if (price <= 0) validationErrors.price = "Price is required";
    if (previewImage.length < 2 && !previewImage.includes(".com"))
      validationErrors.previewImage = "Preview image is required";
    if (
      image.length &&
      !image.endsWith(".jpg") &&
      !image.endsWith(".jpeg") &&
      !image.endsWith(".png")
    )
      validationErrors.image = "Image URL must end in .png, .jpg, or .jpeg";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, dispatch createSpot
      const newSpot = {
        address,
        city,
        state,
        country,
        name,
        description,
        price,
        lat: 90,
        lng: 90,
      };

      const newImage = {};
      const values = Object.keys(spots);
      const lastId = Number(values[values.length - 1]) + 1;

      if (formType === "Create a New Spot") {
        dispatch(createSpot(newSpot));
        newImage.id = lastId;
        newImage.url = previewImage;
        newImage.preview = true;

        dispatch(createSpotImage(newImage));
      }
      navigate(`/spots/${lastId}`);
      reset();
    }
  }

  function reset() {
    setCountry("");
    setCity("");
    setState("");
    setAddress("");

    setDescription("");
    setName("");
    setPrice("");
    setPreviewImage("");
    setImage("");
  }

  return (
    <>
      <h1>{formType} </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Where&apos;s your place located?</h3>
          <p className="create-spot-headers">
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <label>
            <p>Country</p>
            <input
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          {errors.country && <p style={{ color: "red" }}>{errors.country} </p>}
          <label>
            <p>Street Address</p>
            <input
              type="text"
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          {errors.address && <p style={{ color: "red" }}>{errors.address} </p>}
          <label>
            <div id="form-side-by-side">
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && <p style={{ color: "red" }}>{errors.city} </p>}
              <p>State</p>
              <input
                type="text"
                placeholder="STATE"
                onChange={(e) => setState(e.target.value)}
              />
              {errors.state && <p style={{ color: "red" }}>{errors.state} </p>}
            </div>
          </label>
        </div>
        <div>
          <h3>Describe your place to guests</h3>
          <p className="create-spot-headers">
            Mention the best features of your space, any special amentities like
            fast wif or parking, and what you love about the neighborhood.
          </p>
          <label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Please write at least 30 characters"
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description} </p>
            )}
          </label>
        </div>
        <div>
          <h3>Create a title for your spot</h3>
          <p className="create-spot-headers">
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name of your spot"
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name} </p>}
          </label>
        </div>
        <div>
          <h3>Set a base price for your spot</h3>
          <p className="create-spot-headers">
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div>
            <label id="price-label">
              <p id="money">$</p>
              <input 
              id="money-select"
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Price per night (USD)"
              />
              {errors.price && <p style={{ color: "red" }}>{errors.price} </p>}
            </label>
          </div>
        </div>
        <div>
          <h3>Liven up your spot with photos</h3>
          <p className="create-spot-headers">Submit a link to at least one photo to publish your spot.</p>
          <label>
            <input
              onChange={(e) => setPreviewImage(e.target.value)}
              type="text"
              placeholder="Preview Image URL; example: https://intdesigners.com/wp-content/uploads/2024/03/luxurious-living-room.webp"
            />
            {errors.previewImage && (
              <p style={{ color: "red" }}>{errors.previewImage} </p>
            )}
          </label>
          <label>
            <input
              onChange={(e) => setImage(e.target.value)}
              type="text"
              placeholder="Image URL"
            />
            {errors.image && <p style={{ color: "red" }}>{errors.image} </p>}
          </label>
          <label>
            <input type="text" placeholder="Image URL" onChange={(e) => setImage2(e.target.value)}/>
            <input type="text" placeholder="Image URL" onChange={(e) => setImage3(e.target.value)}/>
            <input type="text" placeholder="Image URL" onChange={(e) => setImage4(e.target.value)}/>
          </label>
        </div>
        <div>
          <input type="submit" onSubmit={handleSubmit} />
        </div>
      </form>
    </>
  );
}

export default CreateASpot;
