const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading1:
    "font-poppins font-semibold ss:text-[72px] text-[52px] md:pt-10 text-white flex justify-center items-center",
  heading2:
    "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
  subheading: "font-poppins font-normal text-white text-[22px]",
  paragraph: "font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]",
  label: "font-poppins font-normal text-dimWhite text-[16px]",

  bookName: "font-poppins font-semibold text-[28px] text-white my-10 text-center",
  author: "font-poppins font-normal text-[18px] text-white my-10 text-center",
  bookDetails: "font-poppins font-normal text-[16px] text-white text-center leading-[30.8px]",
  button:
    "rounded-full mt-2 py-2 px-3 bg-dimWhite font-poppins text-primary font-semibold transition duration-300 hover:bg-blue-400",
  buttonCancel:
    "rounded-full mt-2 py-2 px-3 bg-dimWhite font-poppins text-primary font-semibold transition duration-300 hover:bg-red-400",

  formInput: "appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3",
  formLabel: "font-poppins font-normal text-dimWhite text-[20px]",

  flexCenter: "flex justify-center items-center",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
}

export const layout = {
  section: `flex flex-col ${styles.paddingY}`,
}

export default styles
