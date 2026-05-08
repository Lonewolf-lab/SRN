import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, MapPin } from "lucide-react";
import India from "@react-map/india";

const getPhoto = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=E8622A&color=fff&size=150`;

const bearerData = {
  "Andaman and Nicobar Islands": { name: "Anil Kumar", designation: "UT President", photo: getPhoto("Anil Kumar") },
  "Andhra Pradesh": { name: "Reddy Venkat", designation: "State President", photo: getPhoto("Reddy Venkat") },
  "Arunachal Pradesh": { name: "Pema Dorjee", designation: "State President", photo: getPhoto("Pema Dorjee") },
  "Assam": { name: "Bikash Sharma", designation: "State President", photo: getPhoto("Bikash Sharma") },
  "Bihar": { name: "Rakesh Singh", designation: "State President", photo: getPhoto("Rakesh Singh") },
  "Chandigarh": { name: "Sandeep Singh", designation: "UT President", photo: getPhoto("Sandeep Singh") },
  "Chhattisgarh": { name: "Ramesh Patel", designation: "State President", photo: getPhoto("Ramesh Patel") },
  "Dadra and Nagar Haveli": { name: "Ajay Dev", designation: "UT President", photo: getPhoto("Ajay Dev") },
  "Daman and Diu": { name: "Kishor Bhai", designation: "UT President", photo: getPhoto("Kishor Bhai") },
  "Delhi": { name: "Arvind Gupta", designation: "State President", photo: getPhoto("Arvind Gupta") },
  "Goa": { name: "Carlos D'Souza", designation: "State President", photo: getPhoto("Carlos D'Souza") },
  "Gujarat": { name: "Mukesh Bhai", designation: "State President", photo: getPhoto("Mukesh Bhai") },
  "Haryana": { name: "Devender Jat", designation: "State President", photo: getPhoto("Devender Jat") },
  "Himachal Pradesh": { name: "Anand Sharma", designation: "State President", photo: getPhoto("Anand Sharma") },
  "Jammu and Kashmir": { name: "Tariq Ali", designation: "UT President", photo: getPhoto("Tariq Ali") },
  "Jharkhand": { name: "Sanjay Munda", designation: "State President", photo: getPhoto("Sanjay Munda") },
  "Karnataka": { name: "Gowda Patil", designation: "State President", photo: getPhoto("Gowda Patil") },
  "Kerala": { name: "Krishnan Nair", designation: "State President", photo: getPhoto("Krishnan Nair") },
  "Lakshadweep": { name: "Abdul Rahman", designation: "UT President", photo: getPhoto("Abdul Rahman") },
  "Madhya Pradesh": { name: "Shivraj Chauhan", designation: "State President", photo: getPhoto("Shivraj Chauhan") },
  "Maharashtra": { name: "Sunil Deshmukh", designation: "State President", photo: getPhoto("Sunil Deshmukh") },
  "Manipur": { name: "Rajkumar Singh", designation: "State President", photo: getPhoto("Rajkumar Singh") },
  "Meghalaya": { name: "John Sangma", designation: "State President", photo: getPhoto("John Sangma") },
  "Mizoram": { name: "Lal Thanhawla", designation: "State President", photo: getPhoto("Lal Thanhawla") },
  "Nagaland": { name: "Neiphiu Zhimomi", designation: "State President", photo: getPhoto("Neiphiu Zhimomi") },
  "Odisha": { name: "Pratap Das", designation: "State President", photo: getPhoto("Pratap Das") },
  "Puducherry": { name: "Rangaswamy", designation: "UT President", photo: getPhoto("Rangaswamy") },
  "Punjab": { name: "Gurpreet Singh", designation: "State President", photo: getPhoto("Gurpreet Singh") },
  "Rajasthan": { name: "Ashok Gehlot", designation: "State President", photo: getPhoto("Ashok Gehlot") },
  "Sikkim": { name: "Prem Tamang", designation: "State President", photo: getPhoto("Prem Tamang") },
  "Tamil Nadu": { name: "Murugan K.", designation: "State President", photo: getPhoto("Murugan K.") },
  "Telangana": { name: "Rao Prasad", designation: "State President", photo: getPhoto("Rao Prasad") },
  "Tripura": { name: "Biplab Deb", designation: "State President", photo: getPhoto("Biplab Deb") },
  "Uttar Pradesh": { name: "Yogi Adityanath", designation: "State President", photo: getPhoto("Yogi Adityanath") },
  "Uttarakhand": { name: "Pushkar Dhami", designation: "State President", photo: getPhoto("Pushkar Dhami") },
  "West Bengal": { name: "Amitava Bose", designation: "State President", photo: getPhoto("Amitava Bose") },
};

export default function StateBearersMap({ lang }) {
  const [activeState, setActiveState] = useState(null);

  const handleSelect = (stateName) => {
    setActiveState(stateName);
  };

  const closeModal = () => {
    setActiveState(null);
  };

  const bearerInfo = activeState ? bearerData[activeState] : null;
  const en = lang === "en";

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 
        We rely on the package to render the map. 
        It inherently provides an SVG which scales with its 'size' prop.
      */}
      <div className="max-w-xl w-full flex justify-center py-8 translate-x-4 md:translate-x-10 [&>.map]:!w-full [&>.map>svg]:!w-full [&>.map>svg]:!h-auto">
        <India
          type="select-single"
          size={800}
          mapColor="#FFF9F2"
          strokeColor="#E8622A"
          strokeWidth={1}
          hoverColor="#E8622A"
          selectColor="#C04A18"
          hints={true}
          hintTextColor="#1E0F05"
          hintBackgroundColor="#FFF9F2"
          onSelect={handleSelect}
        />
      </div>

      <AnimatePresence>
        {activeState && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative border border-[#F0D5B8]"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-[#7A5C45] hover:text-[#1E0F05] transition-colors bg-[#FDF5EC] hover:bg-[#F0D5B8] p-1.5 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center text-center mt-2">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#E8622A] to-[#C04A18] rounded-full flex items-center justify-center shadow-inner mb-4 overflow-hidden border-4 border-[#FFF9F2] shadow-md">
                    {bearerInfo?.photo ? (
                      <img src={bearerInfo.photo} alt={bearerInfo?.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-white" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[#E8622A] font-medium text-sm mb-1 bg-[#FDF5EC] px-3 py-1 rounded-full border border-[#E8622A]/20">
                    <MapPin className="w-3.5 h-3.5" />
                    {activeState}
                  </div>
                  
                  {bearerInfo ? (
                    <>
                      <h3 className="text-xl font-bold text-[#1E0F05] font-serif leading-tight mt-3">
                        {bearerInfo.name}
                      </h3>
                      <p className="text-[#7A5C45] text-sm mt-1">{bearerInfo.designation}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-[#1E0F05] font-serif leading-tight mt-3">
                        {en ? "Information Unavailable" : "जानकारी उपलब्ध नहीं"}
                      </h3>
                      <p className="text-[#7A5C45] text-sm mt-1">
                        {en ? "No bearer assigned currently." : "वर्तमान में कोई पदाधिकारी नियुक्त नहीं।"}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
