Claro, aquí tienes el contenido del PDF convertido a formato Markdown (.md):

```markdown
# Seguridad Informática

## Practica 2 – Algoritmo RSA

**Datos de entrada:**

- p = 67
- q = 83

### Paso 1: Calcular n

\[
n = p \* q
\]

### Paso 2: Calcular φ(n)

\[
\phi(n) = (p - 1) \* (q - 1)
\]

### Paso 3: Elegir e (clave pública)

Debes seleccionar **el cuarto número candidato** que cumpla **todas** estas condiciones:

1. \( 1 < e < \phi(n) \)
2. \( \text{mcd}(e, \phi(n)) = 1 \)

### Paso 4: Calcular d (clave privada)

Debes encontrar d, el inverso multiplicativo de e módulo φ(n):
\[
d \equiv e^{-1} \pmod{\phi(n)}
\]
Es decir:
\[
e \times d \equiv 1 \pmod{\phi(n)}
\]
Puedes calcularlo usando el **algoritmo extendido de Euclides**.

**Recomendaciones para los alumnos:**

- Usen una calculadora o script para el algoritmo de Euclides.
- Anoten todos los candidatos de e que van probando, para justificar que el cuarto es el correcto.

### Paso 5: Descifra el mensaje con tu clave privada:
```

1058 2597 4955 4201 3162 4343 2754 2497 336 2597

```

---

## EVIDENCIAS (OBLIGATORIO)

Dependiendo del método usado, deberás incluir:

### Si usaste calculadora científica o manual:
- Fotos nítidas de cada hoja de cálculo, con buena iluminación y letra legible.
- Cada foto debe estar numerada y con un pie de foto que indique qué paso se está mostrando.
- Las fotos deben estar integradas en el documento PDF (no en archivos separados).

### Si usaste software / herramienta digital (Python, Excel, calculadora web, etc.):
- Capturas de pantalla de:
  - El código fuente.
  - La ventana de resultados.
  - La salida de cada operación importante.
- Cada captura debe tener un pie explicativo.

### Si usaste ambos métodos:
- Debes incluir ambas evidencias y comparar que los resultados coinciden.
```

Si necesitas que ajuste algo (por ejemplo, que las fórmulas se vean de otra forma, o que omita la página 2), dímelo y lo modifico.
