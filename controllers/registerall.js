const datas = require("../db2.json");
const Property = require("../models/propertyModel");
const seedData = async () => {
  console.log("called");
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log("started");
  for (let data of datas.property) {
    await Property.create({
      PropertyType: data["Acquired Collateral Type"],
      Region: "Eastern",    
      BranchName: data["branch"],
      DistrictName: data["district"],
      AcquisitionValue: data["Acquired Amount"],
      PrincipaleAcquistion: data["Outstanding Balance Principal"],
      InterestAcquisition: data["Total Outstanding (P+I)"],
      Remark: data["Status"],
      OwnerBorrowerName: data["Name of Customer"],
    });
  }
  console.log("finished");
};
seedData();
