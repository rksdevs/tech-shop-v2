import Container from "../components/Container";

const ContactUs = () => {
  return (
    <div className="flex w-full flex-col gap-8">
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="section-heading flex justify-center">
            <h1 className="text-[28px] font-extrabold">Contact Us</h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
