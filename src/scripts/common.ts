export class Common {
    public static getBirthDayString(birthday: Date): string {
        const birthDate = new Date(birthday);
        console.log(birthDate)

        return birthDate.getFullYear() + "-"
            + ((birthDate.getMonth() + 1).toString().length >= 2
                ? (birthDate.getMonth() + 1)
                : "0" + (birthDate.getMonth() + 1))

            + "-"
            + birthDate.getDate();
    }

    public static verifyBirthday(birthday: string): string {
        const now = new Date(Date.now());
        const birth = new Date(birthday);

        const age = now.getFullYear() - birth.getFullYear();
        if (age < 10) {
            return "어린이";
        }
        if (age < 20) {
            return "10대";
        }
        if (age < 30) {
            return "20대";
        }
        if (age < 40) {
            return "30대";
        }
        if (age < 50) {
            return "40대";
        }
        if (age < 60) {
            return "50대";
        }
        return "60대 이상";
        }

    public static truncateString(str: string , length : number = 30): string {

        if (str && str.length > length) {
            return str.slice(0, 27) + "...";
        }
        return str;
}

    public static convertDateToString(date: Date): string {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}-${month}-${day}`;
    }

}