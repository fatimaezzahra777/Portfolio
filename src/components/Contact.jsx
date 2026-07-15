import { useState } from 'react'

const FORM_ENDPOINT =
  'https://formsubmit.co/ajax/fatimaezzahrabel777@gmail.com'

function Contact() {
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setFormStatus('sending')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (!response.ok) throw new Error('Échec de l’envoi')

      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <section className="contact page-content" id="contact">
      <div className="contact-intro">
        <p className="eyebrow">Construisons quelque chose de fort</p>
        <h2>
          Vous avez
          <span>une idée ?</span>
          <span>Parlons-en.</span>
        </h2>

        <div className="contact-info">
          <p>
            Décrivez-moi votre projet, vos objectifs et votre calendrier. Je
            vous répondrai avec des pistes concrètes.
          </p>
          <a href="mailto:fatimaezzahrabel777@gmail.com">
            fatimaezzahrabel777@gmail.com
          </a>
          <a href="tel:+212633697284">+212 633 697 284</a>
          <span>Maroc · Disponible pour de nouvelles opportunités</span>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="_subject"
          value="Nouveau message depuis mon portfolio"
        />
        <input type="hidden" name="_template" value="table" />
        <input
          className="form-honeypot"
          type="text"
          name="_honey"
          tabIndex="-1"
          autoComplete="off"
        />
        <div className="form-heading">
          <span>Votre projet</span>
          <strong>Commençons la conversation.</strong>
        </div>
        <label>
          Votre nom
          <input type="text" name="name" placeholder="Nom complet" required />
        </label>
        <label>
          Votre e-mail
          <input type="email" name="email" placeholder="vous@email.com" required />
        </label>
        <label className="full-field">
          Parlez-moi du projet
          <textarea name="message" placeholder="Quelques mots sur votre idée..." required />
        </label>
        <button
          className="primary-button full-field"
          type="submit"
          disabled={formStatus === 'sending'}
        >
          {formStatus === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
          <span aria-hidden="true">↗</span>
        </button>
        <p
          className={`form-status form-status-${formStatus}`}
          role="status"
          aria-live="polite"
        >
          {formStatus === 'success' &&
            'Message envoyé avec succès. Je vous répondrai rapidement.'}
          {formStatus === 'error' &&
            "Le message n'a pas pu être envoyé. Écrivez-moi directement par e-mail."}
        </p>
      </form>
    </section>
  )
}

export default Contact
