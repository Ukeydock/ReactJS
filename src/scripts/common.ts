export class Common {
    public static getBirthDayString(birthday: Date): string {

        const birthDate = new Date(birthday);

        return birthDate.getFullYear() + "-"
            + ((birthDate.getMonth() + 1).toString().length >= 2
                ? (birthDate.getMonth() + 1)
                : "0" + (birthDate.getMonth() + 1))

            + "-"
            + birthDate.getDate();
    }
}