const cvTemplates = [
    {
      id: "pro",
      name: "Chuyên Nghiệp",
      image: "/chuyen-nghiep.png", // đúng chuẩn khi để ảnh trong public
      description: "Mẫu chuyên nghiệp, dành cho kế toán hoặc các ngành nghiêm túc.",
      badges: ["Chuyên nghiệp", "+8"],
      fields: {
        avatar: "",             // Ảnh đại diện
        fullName: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        website: "",
        objective: "",
        skills: "",
        hobbies: "",
        experience: "",
        education: "",
        activity: "",
        award: "",
        certificate: "",
        additional: "",
        reference: "",
      }
    },
    {
      id: "ambition",
      name: "Tham vọng",
      image: "/tham-vong.png",
      description: "Phong cách thanh lịch, nổi bật kỹ năng và kinh nghiệm.",
      badges: ["ATS", "Thanh lịch", "+9"],
      fields: {
        avatar: "",
        fullName: "",
        position: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        skills: "",
        hobbies: "",
        reference: "",
        additional: "",
        objective: "",
        experience: "",
        education: "",
        award: "",
        certificate: "",
        activity: "",
      }
    },
    {
      id: "expert",
      name: "Chuyên gia",
      image: "/chuyen-gia.png",
      description: "Mẫu trang trọng, trình bày thông tin khoa học, hợp cho CV quản lý.",
      badges: ["Trang trọng", "Thanh lịch", "+9"],
      fields: {
        
        fullName: "",
        position: "",
        phone: "",
        email: "",
        address: "",
        objective: "",
        experience: "",
        education: "",
        skills: "",
        award: "",
        certificate: "",
        reference: "",
        activity: "",
        hobbies: "",
        additional: "",
      }
    }
  ];
  
  export default cvTemplates;
  