import { useState } from "react";
import { update } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FunctionContext } from "../../context/FormContext";

// i set a handle submit function that will check for errors

function UpdateASpot() {
  const current = useSelector((state) => state.currentSpot);

  const [country, setCountry] = useState(current.country);
  const [address, setAddress] = useState(current.address);
  const [city, setCity] = useState(current.city);
  const [state, setState] = useState(current.state);
  const [lat, setLat] = useState(current.lat);
  const [lng, setLng] = useState(current.lng);
  const [description, setDescription] = useState(current.description);
  const [name, setName] = useState(current.name);
  const [price, setPrice] = useState(current.price);
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const { formType, changeContext } = useContext(FunctionContext);

  const id = useParams().spotId;

  //* i already have the id. i need to get the info from the current spot
  // * once "update" is clicked, set the current spot to be that spots id

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (current) {
      setCountry(current.country || "");
      setAddress(current.address || "");
      setCity(current.city || "");
      setState(current.state || "");
      setLat(current.lat || "");
      setLng(current.lng || "");
      setDescription(current.description || "");
      setName(current.name || "");
      setPrice(current.price || "");
      setPreviewImage(current.previewImage || "");
    }
  }, [current]);

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
    if (previewImage && previewImage.length && !previewImage.includes(".com"))
      validationErrors.previewImage = "Preview image is required";
    if (
      image.length &&
      !image.endsWith(".jpg") &&
      !image.endsWith(".jpeg") &&
      !image.endsWith(".png")
    )
      validationErrors.image = "Image URL must end in .png, .jpg, or .jpeg";

    if ((lat && lat < -90) || lat > 90)
      validationErrors.lat = "Latitude must be within -90 and 90";
    if ((lng && lng < -180) || lng > 180)
      validationErrors.lng = "Longitude must be within -180 and 180";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, dispatch createSpot
      const updatedSpot = {
        address,
        city,
        state,
        country,
        name,
        description,
        price,
      };

      if (lat) updatedSpot.lat = Number(lat);
      else lat = undefined;
      if (lng) updatedSpot.lng = Number(lng);
      else lng = undefined;

      if (formType === "Update your Spot") dispatch(update(updatedSpot, id));
      navigate(`/spots/${id}`);
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
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>
          <label>
            <p>Country</p>
            <input
              type="text"
              placeholder="Country"
              value={country}
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
              value={address}
            />
          </label>
          {errors.address && <p style={{ color: "red" }}>{errors.address} </p>}
          <label>
            <div id="update-city-state">
              <p>City</p>
              <input
                type="text"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              {errors.city && <p style={{ color: "red" }}>{errors.city} </p>}
              <p>State</p>
              <input
                type="text"
                placeholder="STATE"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
              {errors.state && <p style={{ color: "red" }}>{errors.state} </p>}
            </div>
            <div id="update-lat-lng">
              <p>Latitude</p>
              <input
                type="text"
                placeholder="Example: 87.948"
                onChange={(e) => setLat(e.target.value)}
                value={lat}
              />
              {errors.lat && <p style={{ color: "red" }}>{errors.lat} </p>}
              <p>Longitude</p>
              <input
                type="text"
                placeholder="Example: 132.8787"
                onChange={(e) => setLng(e.target.value)}
                value={lng}
              />
              {errors.lng && <p style={{ color: "red" }}>{errors.lng} </p>}
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
              value={description}
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
              value={name}
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
                value={price}
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
              value={previewImage}
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
          <input type="submit" value="Update your Spot" onSubmit={handleSubmit} />
        </div>
      </form>
    </>
  );
}

export default UpdateASpot;
