export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "seed", label: "Seeds" },
      { id: "farmtools", label: "Farm Tools" },
      { id: "fertilizer", label: "Fertilizer" },
      { id: "pestisides", label: "Pestisides" },
      { id: "others", label: "Others" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "agrobangla", label: "Agro Bangla" },
      { id: "agritech", label: "Agri Tech" },
      { id: "aci", label: "ACI" },
      { id: "famai", label: "Farm AI" },
      { id: "farmy", label: "FarmY" },
      { id: "unknown", label: "Unknown" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Marketplace",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "seed",
    label: "Seeds",
    path: "/shop/listing",
  },
  {
    id: "farmtools",
    label: "Farm Tools",
    path: "/shop/listing",
  },
  {
    id: "fertilizer",
    label: "Fertilizer",
    path: "/shop/listing",
  },
  {
    id: "pestisides",
    label: "Pestisides",
    path: "/shop/listing",
  },
  {
    id: "others",
    label: "Others",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  seed: "Seeds",
  farmtools: "Farm Tools",
  fertilizer: "Fertilizer",
  pestisides: "Pestisides",
  others: "Others",
};

export const brandOptionsMap = {
  agrobangla: "Agro Bangla",
  agritech: "Agri Tech",
  aci: "ACI",
  famai: "Farm AI",
  farmy: "FarmY",
  unknown: "Unknown",
};

export const filterOptions = {
  category: [
    { id: "seed", label: "Seeds" },
    { id: "farmtools", label: "Farm Tools" },
    { id: "fertilizer", label: "Fertilizer" },
    { id: "pestisides", label: "Pestisides" },
    { id: "others", label: "Others" },
  ],
  brand: [
    { id: "agrobangla", label: "Agro Bangla" },
      { id: "agritech", label: "Agri Tech" },
      { id: "aci", label: "ACI" },
      { id: "famai", label: "Farm AI" },
      { id: "farmy", label: "FarmY" },
      { id: "unknown", label: "Unknown" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
