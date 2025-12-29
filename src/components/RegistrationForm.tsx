/* Этот компонент содержит форму регистрации.
   Она собирает данные пользователя, адрес и предпочтения по оплате.
   Она валидирует обязательные поля и чекбоксы перед отправкой. */

"use client";

import { useState, FormEvent } from "react";
import styles from "./RegistrationForm.module.css";
import { supabase } from "../lib/supabaseClient";

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    city: string;
    country: string;
    paymentplan: "1x" | "2x" | "3x";
}

export default function RegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        whatsapp: "",
        address: "",
        city: "",
        country: "",
        paymentplan: "1x",
    });

    // Checkbox states
    const [hasComputer, setHasComputer] = useState(false);
    const [willPayAi, setWillPayAi] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [hasDiscord, setHasDiscord] = useState(false);

    const [loading, setLoading] = useState(false);

    // Compute if form is valid
    // Basic validation: all text fields (except whatsapp maybe?) filled + all checkboxes checked
    // Note: WhatsApp is marked as "SI DIFFERENT" in requirements, so it implies optional if same as phone, 
    // but let's make it optional regardless or just fill it. "WHATSAPP SI DIFFEREND" -> let's treat as optional.
    const isFormValid =
        formData.firstname.trim() !== "" &&
        formData.lastname.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.address.trim() !== "" &&
        formData.city.trim() !== "" &&
        formData.country.trim() !== "" &&
        hasComputer &&
        willPayAi &&
        isAvailable &&
        hasDiscord;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);

        try {
            const { data, error } = await supabase
                .from('registrations')
                .insert([
                    {
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                        email: formData.email,
                        phone: formData.phone,
                        whatsapp: formData.whatsapp,
                        address: formData.address,
                        city: formData.city,
                        country: formData.country,
                        paymentplan: formData.paymentplan,
                    },
                ]);

            if (error) {
                throw error;
            }

            alert("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
            // Reset form or redirect?
            // window.location.href = "/"; // Optional

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>

            {/* 1 & 2 - NOM & PRENOM */}
            <div className={styles.section}>
                <label className={styles.label}>Личные данные</label>
                <input
                    type="text"
                    name="lastname"
                    placeholder="Фамилия (Nom)"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    name="firstname"
                    placeholder="Имя (Prénom)"
                    value={formData.firstname}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>

            {/* 3, 4, 5 - CONTACT */}
            <div className={styles.section}>
                <label className={styles.label}>Контакты</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Номер телефона"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <input
                    type="tel"
                    name="whatsapp"
                    placeholder="WhatsApp (если отличается)"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>

            {/* 6 - ADRESSE */}
            <div className={styles.section}>
                <label className={styles.label}>Адрес</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Улица, дом, квартира"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                        type="text"
                        name="city"
                        placeholder="Город"
                        value={formData.city}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Страна"
                        value={formData.country}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
            </div>

            {/* 7 - PAIEMENT */}
            <div className={styles.section}>
                <label className={styles.label}>Вариант оплаты</label>
                <div className={styles.paymentOptions}>
                    {/* Option 1 */}
                    <label className={`${styles.radioLabel} ${formData.paymentplan === "1x" ? styles.selected : ""}`}>
                        <input
                            type="radio"
                            name="paymentplan"
                            value="1x"
                            checked={formData.paymentplan === "1x"}
                            onChange={(e) => setFormData(prev => ({ ...prev, paymentplan: "1x" }))}
                            className={styles.radioInput}
                        />
                        <div className={styles.customRadio}>
                            <div className={styles.radioDot} />
                        </div>
                        <div className={styles.paymentText}>
                            <span className={styles.paymentTitle}>1 x 1200 €</span>
                            <span className={styles.paymentSub}>Единовременный платеж (Выгодно)</span>
                        </div>
                    </label>

                    {/* Option 2 */}
                    <label className={`${styles.radioLabel} ${formData.paymentplan === "2x" ? styles.selected : ""}`}>
                        <input
                            type="radio"
                            name="paymentplan"
                            value="2x"
                            checked={formData.paymentplan === "2x"}
                            onChange={(e) => setFormData(prev => ({ ...prev, paymentplan: "2x" }))}
                            className={styles.radioInput}
                        />
                        <div className={styles.customRadio}>
                            <div className={styles.radioDot} />
                        </div>
                        <div className={styles.paymentText}>
                            <span className={styles.paymentTitle}>2 x 600 €</span>
                            <span className={styles.paymentSub}>Оплата в два этапа</span>
                        </div>
                    </label>

                    {/* Option 3 */}
                    <label className={`${styles.radioLabel} ${formData.paymentplan === "3x" ? styles.selected : ""}`}>
                        <input
                            type="radio"
                            name="paymentplan"
                            value="3x"
                            checked={formData.paymentplan === "3x"}
                            onChange={(e) => setFormData(prev => ({ ...prev, paymentplan: "3x" }))}
                            className={styles.radioInput}
                        />
                        <div className={styles.customRadio}>
                            <div className={styles.radioDot} />
                        </div>
                        <div className={styles.paymentText}>
                            <span className={styles.paymentTitle}>3 x 400 €</span>
                            <span className={styles.paymentSub}>Рассрочка на 3 месяца</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* CHECKBOXES */}
            <div className={styles.section}>
                <label className={styles.label}>Подтверждение требований</label>
                <div className={styles.checkboxGroup}>

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.visuallyHidden}
                            checked={hasComputer}
                            onChange={(e) => setHasComputer(e.target.checked)}
                        />
                        <div className={styles.customCheckbox}>
                            <svg className={styles.checkboxIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>
                            У меня есть компьютер (PC/Mac) минимум с 8GB RAM и процессором не слабее i3.
                        </span>
                    </label>

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.visuallyHidden}
                            checked={willPayAi}
                            onChange={(e) => setWillPayAi(e.target.checked)}
                        />
                        <div className={styles.customCheckbox}>
                            <svg className={styles.checkboxIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>
                            Я готов(а) оплачивать подписку на ИИ (Google AI Pro или ChatGPT+) во время обучения.
                        </span>
                    </label>

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.visuallyHidden}
                            checked={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                        />
                        <div className={styles.customCheckbox}>
                            <svg className={styles.checkboxIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>
                            Я располагаю временем для обучения в течение 3 месяцев, начиная с 23 МАРТА 2026.
                        </span>
                    </label>

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.visuallyHidden}
                            checked={hasDiscord}
                            onChange={(e) => setHasDiscord(e.target.checked)}
                        />
                        <div className={styles.customCheckbox}>
                            <svg className={styles.checkboxIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M20.707 5.293a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L9 15.586 19.293 5.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span>
                            У меня установлено приложение Discord и есть рабочий аккаунт.
                        </span>
                    </label>

                </div>
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={!isFormValid || loading}
            >
                {loading ? "Обработка..." : "ОТПРАВИТЬ ЗАЯВКУ"}
            </button>

            {!isFormValid && (
                <div style={{ textAlign: "center", marginTop: "10px", color: "#666", fontSize: "0.85rem" }}>
                    * Заполните все поля и отметьте все галочки
                </div>
            )}

        </form>
    );
}
