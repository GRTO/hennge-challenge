import { IMail } from "../pages/ListMails/ListMails.interface";

/**
 * Verify if a word is included or not on email's body / subject
 * @param email the email the we are going to inspect
 * @param word the word the we are going to search
 * @returns `True` if the words is included in the body or in subject. If it is not included
 * it returns `False`.
 */
export const isWordOnEmail = (email: IMail, word: string) => {
  const wordInLowerCase = word.toLocaleLowerCase();
  return [email.body.toLocaleLowerCase(), email.subject.toLocaleLowerCase()]
    .join(" ")
    .includes(wordInLowerCase);
};
