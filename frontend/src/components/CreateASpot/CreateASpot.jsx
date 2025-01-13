import { useState } from "react";
import { createSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

   const spots = useSelector((state) => state.spots);
   console.log('FROM CREATE SPOT ===>', spots);

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
    if (price.length < 2) validationErrors.price = "Price is required";
    if (previewImage.length < 2 && !previewImage.includes(".com"))
      validationErrors.previewImage = "Preview image is required";
    if (
      image.length &&
      (!image.endsWith(".jpg") &&
        !image.endsWith(".jpeg") &&
        !image.endsWith(".png"))
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

      dispatch(createSpot(newSpot));
        navigate('/')
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
      <h1>Create A new Spot</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Where&apos;s your place located?</h3>
          <p>
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
          <p>
            Mention the best features of your space, any special amentities like
            fast wif or parking, and what you love about the neighborhood.
          </p>
          <label>
            <input
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
          <p>
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
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <div>
            <label>
              <p>$</p>
              <input
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
          <p>Submit a link to at least one photo to publish your spot.</p>
          <label>
            <input
              onChange={(e) => setPreviewImage(e.target.value)}
              type="text"
              placeholder="Preview Image URL; example: google.com"
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
            <input type="text" placeholder="Image URL" />
            <input type="text" placeholder="Image URL" />
            <input type="text" placeholder="Image URL" />
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
