package com.vidrieria.ServiceInventariado.application.applicationServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        if (mailSender == null) {
            System.err.println("WARN: JavaMailSender no está configurado. No se enviará el email.");
            return; // No intentar enviar si no está configurado
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("tu-correo-configurado@gmail.com"); // Reemplaza o lee de properties
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
        } catch (Exception e) {
        }
    }
}