#  2. Validador Simples de E-mail

def validar_email(email):
    """
    Verifica se o email é válido.
    input: email (str) - email a ser validado
    output: bool - True se o email for válido, False caso contrário
    
    """
    if email.count("@") != 1:
        return False
    
    parte_local, parte_dominio = email.split("@")
    
    is_valid_local, is_valid_dominio = validar_local(parte_local), validar_dominio(parte_dominio)

    if not is_valid_local:
        return False

    if not is_valid_dominio:
        return False
    
    return True

def validar_dominio(dominio):
    """
    Verifica se o domínio do email é válido.
    input: dominio (str) - parte do email após o "@"
    output: bool - True se o domínio for válido, False caso contrário

    Regras:
    - Deve conter pelo menos um "."
    - Não deve começar ou terminar com "."
    - Não deve conter ".." (pontos consecutivos)
    - Deve conter no máximo dois "." (ex: domain.com.br é válido, domain.com.br.en é inválido)

    """

    if "." not in dominio:
        return False
    if dominio.startswith(".") or dominio.endswith("."):
        return False
    if ".." in dominio:
        return False
    if dominio.count(".") > 2:
        return False
            
    return True

def validar_local(parte_local):
    """

    Verifica se a parte local do email é válida.
    input: parte_local (str) - parte do email antes do "@"
    output: bool - True se a parte local for válida, False caso contrário

    Regras:
    - Não deve estar vazia
    - Não deve conter espaços

    """

    if not parte_local:
        return False
    
    if " " in parte_local:
        return False
    
    return True


if __name__ == "__main__":
    # Exemplo de uso
    emails = ["even3@gmail.com", "invalidoemail.com",
              "outro@invalido@com", "even3team@domain.com.br",
              "user@.com", "user@domain..com",
              "user@domain.c", "user@domaincom.a.b.c", ]

    for email in emails:
        print(f"{email}: {'Parece um e-mail válido' if validar_email(email) else 'E-mail inválido'}")