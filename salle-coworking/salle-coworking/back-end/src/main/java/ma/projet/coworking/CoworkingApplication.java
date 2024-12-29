package ma.projet.coworking;
import ma.projet.coworking.model.User;
import ma.projet.coworking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;



@SpringBootApplication
public class CoworkingApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(CoworkingApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Vérifier si l'utilisateur par défaut existe déjà
        if (!userRepository.existsByEmail("test@example.com")) {
            // Créer un utilisateur par défaut avec mot de passe encodé
            User user = new User();
            user.setFirstName("Test");
            user.setLastName("User");
            user.setEmail("test@example.com");
            user.setPassword(passwordEncoder.encode("password123"));

            userRepository.save(user);
            System.out.println("Utilisateur par défaut ajouté : test@example.com / password123");
        }
    }
}
