export const authConfig = {
    pages: {
      signIn: "/signin", // ถ้าไม่มีบัตร ให้ไล่ไปหน้าล็อกอิน
    },
    providers: [], // ปล่อยว่างไว้ ยามไม่ต้องทำหน้าที่ส่งเมล
    callbacks: {
      authorized(params: any) {
        return !!params.auth; // เช็คแค่ว่าล็อกอินหรือยัง (มีบัตรไหม)
      }
    }
  }