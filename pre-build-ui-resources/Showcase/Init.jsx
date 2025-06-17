import FormDrawer from "../CoreNest/Form/FormDrawer";
const Init = () => {
  return (
    <div>
      <FormDrawer
        open={true}
        onClose={() => {
   
        }}
        record={null}
      />
    </div>
  );
};

export default Init;
