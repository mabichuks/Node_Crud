interface UserLogin {
    username: string;
    password: string;
}

interface UserRegister {
    username: string;
    password: string;
    confirmPassword: string;
}

interface Company {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    name: number;
    designation: string;
    companyId: number;
}