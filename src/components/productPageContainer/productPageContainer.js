//Node Modules
import React, { useState, useEffect } from 'react';

//Components
import ProductPrices from "src/components/bigcommerce/ProductPrices";
import AddToCartButton from "src/components/bigcommerce/AddToCartButton";
import ProductDetailsCollapsible from "src/components/productDetailsCollapsible/productDetailsCollapsible";
import TopSelling from "src/components/topSelling/topSelling";
import InfoModal from "src/components/infoModal/infoModal";
import SizeChart from "src/components/sizeChart/sizeChart";
import SelectionTooltip from './sub-components/selectionTooltip';

//Contexts
import { useContentContext } from 'src/context/ContentContextV2';

//Assets
import groupedBoots from "src/assets/grouped-boots.svg";
import infoIcon from "src/assets/info-icon.svg";

const ProductPageContainer = ({
    activeProduct,
    products
  }) => {
  const {
    bigcommerce_id,
    description,
    images,
    name = '',
    variants,
    brand = {},
    custom_fields,
  } = activeProduct;

  const [activeVariants, setActiveVariants] = useState(variants);

  const { name: brandName = '' } = brand;

  // FIND PRODUCTS OPTIONS
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) === index)

  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [widthOptions, setWidthOptions] = useState([]);

  const colorKey = "Color";
  const sizeKey = "Size";
  const widthKey = "Width";

  // FIND PRODUCTS OPTIONS
  images.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1)
  // FIND PRODUCTS OPTIONS
  images.sort((a, b) => (a.sort_order > b.sort_order) ? 1 : -1)

  // STATES
  const [selectedImage, updateSelectedImage] = useState(() => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].is_thumbnail) {
        return images[i]
      }
    }
  });
  const [activeColor, setActiveColor] = useState('');
  const [activeWidth, setActiveWidth] = useState('');
  const [activeSize, setActiveSize] = useState('');
  const [activeVariant, setActiveVariant] = useState(activeVariants[0]);
  const [activeImagesByColor, setActiveImagesByColor] = useState(() => getActiveImagesByColor());
  const [activeInfoModal, setActiveInfoModal] = useState(false);
  const [activeSizeChart, setActiveSizeChart] = useState(false);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [activeVariantMessages, setActiveVariantMessages] = useState({
    width: "",
    size: ""
  });

  const tooltipMessages = {
    width: "Please select a Width",
    size: "Please select a Size",
  }

  function getActiveImagesByColor() {
    let imagesByColor = []
    for (let j = 0; j < images.length; j++) {
      if (activeColor && images[j].description) {
        images[j].description ? images[j].description === activeColor && imagesByColor.push(images[j]) : imagesByColor.push(images[j])
      } else {
        imagesByColor.push(images[j])
      }
    }
    return imagesByColor;
  }

  const updateSelectedDetail = (type, data) => {
    switch (type) {
      case colorKey:
        activeColor !== data && setFilteredInventory(activeVariants);
        setActiveColor(data);
        break;
      case widthKey:
        activeWidth !== data && setFilteredInventory(activeVariants);
        setActiveWidth(data);
        break;
      case sizeKey:
        activeSize !== data && setFilteredInventory(activeVariants);
        setActiveSize(data);
        break;
      default:
        return;
    }
  }

  const checkVariantQuantities = () => {
    let colorsInStock = [];
    let widthsInStock = [];

    if (filteredInventory.length !== 0) {
      activeColor && filteredInventory.forEach(variant => variant.option_values.forEach(option => {
        (option.label === activeColor) && colorsInStock.push(variant);
      }))
      activeWidth && colorsInStock.forEach(variant => variant.option_values.forEach(option => {
        (option.label === activeWidth) && widthsInStock.push(variant);
      }))
      activeColor && setFilteredInventory(colorsInStock);
      (activeWidth && activeColor) && setFilteredInventory(widthsInStock);
    } else {
      setFilteredInventory(activeVariants)
    }
  }

  // THIS CAN BE BETTER
  const getProductVariant = () => {
    activeVariants.forEach(variant => {
      let colorMatch = false;
      let widthMatch = false;
      let sizeMatch = false;
      variant.option_values.forEach(option => {
        if (option.option_display_name === 'Color' && option.label === activeColor) {
          colorMatch = true;
        }
        if (option.option_display_name === 'Width' && option.label === activeWidth) {
          widthMatch = true;
        }
        if (option.option_display_name === 'Size' && option.label === activeSize) {
          sizeMatch = true;
        }
      });

      colorMatch && sizeMatch && widthMatch && setActiveVariant(variant);
    })
  }

  const showTooltip = () => {
    const activeFlags = [{ width: activeWidth }, { size: activeSize }];
    const updatedVariantMessages = { ...activeVariantMessages };
    activeFlags.forEach(flag => {
      const flagEntry = Object.entries(flag);
      const key = flagEntry[0][0];
      const value = flagEntry[0][1];
      const message = key === "width" ? tooltipMessages.width : tooltipMessages.size;
      value === "" ? updatedVariantMessages[key] = message : updatedVariantMessages[key] = "";
    });
    setActiveVariantMessages(updatedVariantMessages);
  };

  useEffect(() => {
    // SELECTS VARIANT WHEN COLOR, WIDTH, AND SIZE ARE SET
    (activeSize && activeWidth) && getProductVariant();
    (activeColor || activeSize || activeWidth) && checkVariantQuantities();
    // UPDATE SIDE PHOTOS
    (activeColor && activeImagesByColor.length) && (activeColor !== activeImagesByColor[0].description && setActiveImagesByColor(() => getActiveImagesByColor()));
    // UPDATE MAIN IMAGE
    (activeImagesByColor.length && activeImagesByColor[0].description) ? selectedImage.description !== activeImagesByColor[0].description && updateSelectedImage(activeImagesByColor[0]) : updateSelectedImage(activeImagesByColor[0])
  }, [activeColor, activeWidth, activeSize, activeImagesByColor, selectedImage]);

  useEffect(() => {
    //GETTING REALTIME DATA
    fetch(`/.netlify/functions/bigcommerce?endpoint=product&productId=${activeProduct.bigcommerce_id}`, {
      method: 'GET',
    })
      .then(data => data.json())
      .then(data => {
        const variants = data.data;
        let tempColorOptions = [];
        let tempSizeOptions = [];
        let tempWidthOptions = [];
        variants.map(variant => variant.option_values.map(option => {
          option.option_display_name === colorKey && tempColorOptions.push(option.label)
          option.option_display_name === sizeKey && tempSizeOptions.push(option.label)
          option.option_display_name === widthKey && tempWidthOptions.push(option.label);
        }));

        const colorSet = [...new Set(findDuplicates(tempColorOptions))];
        const sizeSet = [...new Set(findDuplicates(tempSizeOptions))].sort(function (a, b) { return a - b });
        const widthSet = [...new Set(findDuplicates(tempWidthOptions))];

        setColorOptions(colorSet); // Unique duplicates
        setSizeOptions(sizeSet); // Unique duplicates
        setWidthOptions(widthSet); // Unique duplicates

        if (widthSet.length === 1) setActiveWidth(widthSet[0]);
        if (colorSet.length === 1) setActiveColor(colorSet[0]);

        setActiveVariants(variants);
      })
  }, []);

  return (
    <div className="product-details">
      <section className="section container">
        <div className="products-details-head">
          <div className="products-photos-container">
            <div className="side-photos">
              {activeImagesByColor.length &&
              activeImagesByColor.map((img, i) => (
                <img
                  height="100px"
                  width="100px"
                  src={img.url_thumbnail}
                  alt="Thumb"
                  key={JSON.stringify(img)}
                  onClick={() => updateSelectedImage(img)}
                />
              ))}
            </div>
            <div className="selected-image-container">
              <img
                src={
                  (selectedImage && selectedImage.url_zoom) ||
                  '/img/default-bc-product.png'
                }
                alt="Main"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="name-price-container">
              <div>
                <span className="brand-name">{brandName}</span>
                <h1>{name}</h1>
              </div>
              <ProductPrices product={activeProduct} variantPrice={activeVariant.price} />
            </div>
          </div>

          <div className="products-details-right">
            <div className="name-price-container">
              <div>
                <span>{brandName}</span>
                <h1>{name}</h1>
              </div>
              <ProductPrices product={activeProduct} variantPrice={activeVariant.price} />
            </div>

            {colorOptions.length > 0 && (
              <div className="swatch-container">
                <label>Color</label>
                <div className="color-swatches">
                  {colorOptions.map((color, i) => {
                      return (
                        <button key={i} className={`swatch ${color === activeColor ? `active-swatch` : ''}`} onClick={() => updateSelectedDetail(colorKey, color)}>{color}</button>
                      )
                    }
                  )}
                </div>
              </div>
            )}
            {widthOptions.length > 0 && (
              <div className="swatch-container">
                <label>Width</label>
                <div className="width-swatches">
                  {activeVariantMessages.width !== "" && <SelectionTooltip message={activeVariantMessages.width} />}
                  {widthOptions.map((width, i) => {
                      /* Check if widthOptions has only one value so it can select that value as the default */
                      const setActive = widthOptions.length === 1 || width === activeWidth;

                      return (
                        <button
                          key={i}
                          className={`swatch ${setActive ? `active-swatch` : ''}`}
                          onClick={() => {
                            if (activeWidth !== "") {
                              setActiveSize("");
                            }
                            setActiveVariantMessages({
                              size: activeWidth !== "" ? tooltipMessages.size : "",
                              width: ""
                            });
                            updateSelectedDetail(widthKey, width);
                          }
                          }>{width}</button>
                      )
                    }
                  )}
                </div>
              </div>
            )}
            <div className="swatch-container">
              <label>Size</label>
              {/* TODO: make swatches into a component  */}
              <div className="size-swatches">
                {activeVariantMessages.size !== "" && <SelectionTooltip message={activeVariantMessages.size} />}
                {sizeOptions.map((size, i) => {
                    let inventoryStatus = true;
                    if (filteredInventory.length > 0) {
                      inventoryStatus = false;
                      for (let i = 0; i < filteredInventory.length; i++) {
                        for (let j = 0; j < filteredInventory[i].option_values.length; j++) {
                          if (filteredInventory[i].option_values[j].option_display_name === 'Size' && filteredInventory[i].option_values[j].label === size && filteredInventory[i].inventory_level !== 0) {
                            inventoryStatus = true;
                            break;
                          }
                        }
                      }
                    }

                    return (
                      <button
                        style={{ minWidth: size.length <= 4 ? '66px' : '120px' }}
                        key={i}
                        className={`swatch ${!inventoryStatus && 'out-of-stock-swatch'} ${size === activeSize ? `active-swatch` : ''}`}
                        onClick={() => {
                          setActiveVariantMessages({
                            ...activeVariantMessages,
                            size: ""
                          });
                          inventoryStatus && updateSelectedDetail(sizeKey, size)
                        }}>{size}</button>
                    )
                  }
                )}
                <a className="size-chart-link" onClick={() => setActiveSizeChart(true)}>Size Chart</a>
              </div>
            </div>
            <AddToCartButton
              simulateDisabled={activeSize && activeWidth ? (activeVariant.inventory_level === 0 ? true : false) : true}
              productId={bigcommerce_id}
              variant={activeVariant.id}
              showTooltip={() => showTooltip()}>Add to Cart</AddToCartButton>
            <div className="coupon-banner" onClick={() => setActiveInfoModal(true)} >
              <img src={groupedBoots} alt="grouped boots" />
              <strong>Buy 1 pair, get TWO pair FREE!</strong>
              <img src={infoIcon} alt="discount info" />
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="product-details-container">
          <ProductDetailsCollapsible title="Description" description={description} custom_fields={custom_fields} showVideo={brandName.toLowerCase() === 'jb dillon reserve'} />
          <ProductDetailsCollapsible title="Features" description={description} custom_fields={custom_fields} />
          <ProductDetailsCollapsible title="Shipping and Returns" description={description} custom_fields={custom_fields} />
        </div>
      </section>

      <section className="section container">
        <TopSelling products={products} />
      </section>

      {/*When adding graphCMS to this page remove the content fallback from this component*/}
      <InfoModal activeInfoModal={activeInfoModal} setActiveInfoModal={setActiveInfoModal} />
      <SizeChart activeSizeChart={activeSizeChart} setActiveSizeChart={setActiveSizeChart} />
    </div >
  )
}

export default ProductPageContainer;
