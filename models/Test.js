const TestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const TestModel = mongoose.model("Tests", TestSchema);
export default TestModel;
