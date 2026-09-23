<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="100" alt="Python Logo"/>
</p>

<h1 align="center">🔐 Algoritmo Híbrido RSA + AES</h1>

<p align="center">
  <strong>Práctica 3 — Seguridad Informática</strong><br>
  Facultad de Ingeniería · Universidad Autónoma de Campeche (UACAM)
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.8%2B-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.8+"/>
  <img src="https://img.shields.io/badge/PyCryptodome-3.20%2B-2C2D72?style=for-the-badge&logo=python&logoColor=white" alt="PyCryptodome"/>
  <img src="https://img.shields.io/badge/Cifrado-AES--256--CBC-00C853?style=for-the-badge&logo=gnuprivacyguard&logoColor=white" alt="AES-256"/>
  <img src="https://img.shields.io/badge/Clave-RSA--2048-FF6F00?style=for-the-badge&logo=letsencrypt&logoColor=white" alt="RSA-2048"/>
  <img src="https://img.shields.io/badge/Licencia-Académico-blue?style=for-the-badge" alt="Académico"/>
</p>

---

## 📋 Descripción

Este proyecto implementa un **sistema de cifrado híbrido** que combina lo mejor de dos mundos:

| Algoritmo | Tipo | Rol en el sistema |
|-----------|------|-------------------|
| **AES-256 (CBC)** | Simétrico | Cifra el mensaje (rápido y eficiente) |
| **RSA-2048 (OAEP)** | Asimétrico | Protege la clave AES y el IV (seguro para intercambio) |

> **¿Por qué híbrido?**  
> AES es muy rápido para cifrar datos grandes, pero necesita que ambas partes compartan una clave secreta.  
> RSA permite intercambiar esa clave de forma segura sin ponerse de acuerdo antes.  
> Juntos, tenemos **velocidad + seguridad en el intercambio de claves**.

---

## 🏗️ ¿Cómo funciona?

```
┌─────────────────────────────────────────────────────────────────┐
│                        EMISOR                                    │
│                                                                  │
│  1. Genera clave AES aleatoria (32 bytes)                        │
│  2. Genera IV aleatorio (32 bytes)                               │
│  3. Cifra el mensaje con AES-256-CBC                             │
│  4. Empaqueta IV + clave AES (64 bytes)                          │
│  5. Cifra el paquete con la clave pública RSA del receptor       │
│                                                                  │
│  📤 Envía: [paquete cifrado con RSA] + [mensaje cifrado con AES] │
└──────────────────────────┬──────────────────────────────────────┘
                           │  Canal público
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                       RECEPTOR                                   │
│                                                                  │
│  1. Descifra el paquete con su clave privada RSA                 │
│  2. Extrae el IV y la clave AES                                  │
│  3. Descifra el mensaje con AES-256-CBC                          │
│                                                                  │
│  📩 Obtiene: Mensaje original                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Requisitos previos

| Herramienta | Versión mínima | Descripción |
|-------------|----------------|-------------|
| 🐍 **Python** | 3.8 o superior | Intérprete de Python |
| 📦 **pip** | Incluido con Python | Gestor de paquetes |

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd "Practica 03_Algoritmo Hibrido"
```

O simplemente descarga y descomprime la carpeta del proyecto.

### 2️⃣ Instalar la dependencia

```bash
pip install -r requirements.txt
```

O instalar directamente:

```bash
pip install pycryptodome
```

> [!NOTE]
> Si `pip` no es reconocido, prueba con `python -m pip install pycryptodome` o `py -m pip install pycryptodome` en Windows.

### 3️⃣ Ejecutar el programa

```bash
python hibrido_rsa_aes.py
```

---

## 📂 Estructura del proyecto

```
Practica 03_Algoritmo Hibrido/
│
├── 🐍 hibrido_rsa_aes.py     # Script principal con toda la lógica
├── 📦 requirements.txt        # Dependencia (pycryptodome)
└── 📖 README.md               # Este archivo
```

---

## ⚙️ Funciones principales

El programa expone **tres funciones** que son las que pide la práctica:

### 🔑 `get_Msj_And_Key(RSA_Publica)`

> Parte del **emisor**: genera la clave AES, el IV, cifra el mensaje y protege todo con RSA.

```python
iv_cifrado_RSA, mensajeCifrado_AES = get_Msj_And_Key(RSA_Publica)
```

**Retorna:**
- `iv_cifrado_RSA` — Paquete con IV + clave AES, cifrado con la clave pública RSA
- `mensajeCifrado_AES` — Mensaje cifrado con AES-256-CBC

---

### 🔓 `decifrar_mensaje(mensajeCifrado_AES, iv_cifrado_RSA, RSA_Privada)`

> Parte del **receptor**: recibe lo que viajó por el canal y extrae el mensaje original.

```python
texto = decifrar_mensaje(mensajeCifrado_AES, iv_cifrado_RSA, RSA_Privada)
```

**Retorna:**
- `texto` — El mensaje original descifrado (string)

---

### 🔒 `Cifrado_AES_enviar_mensaje(mensaje, iv)`

> Función auxiliar que cifra un mensaje con AES-256-CBC usando un IV dado.

```python
cifrado = Cifrado_AES_enviar_mensaje("Hola mundo", iv)
```

---

## 🧪 Pruebas incluidas

El programa ejecuta **4 pruebas automáticas** para verificar que todo funciona correctamente:

| # | Prueba | Qué verifica |
|---|--------|--------------|
| 1 | 📏 **Distintas longitudes** | Mensajes vacíos, cortos, exactos (16 bytes) y largos |
| 2 | 🔀 **No determinismo** | Mismo texto → criptogramas diferentes cada vez |
| 3 | 💥 **Integridad** | Un byte alterado en el cifrado rompe el descifrado |
| 4 | 🚫 **Clave incorrecta** | Otra clave privada no puede descifrar el mensaje |

### Ejemplo de salida esperada:

```
----------------------------------------------------------------------
  RESUMEN DE PRUEBAS
     [OK] 1. Cifrado y descifrado con distintas longitudes
     [OK] 2. Dos envios iguales dan criptogramas distintos
     [OK] 3. Un criptograma alterado no devuelve el mensaje
     [OK] 4. Una clave privada equivocada no descifra

  Pruebas superadas: 4 de 4
----------------------------------------------------------------------
======================================================================
 RESULTADO GENERAL: TODO CORRECTO
======================================================================
```

---

## 📚 Dependencias

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| [`pycryptodome`](https://pypi.org/project/pycryptodome/) | ≥ 3.20 | Librería criptográfica que provee AES, RSA, generación de bytes aleatorios y esquemas de relleno |

### Módulos utilizados de `pycryptodome`:

```python
from Crypto.Cipher import AES, PKCS1_OAEP    # Cifrados AES y RSA-OAEP
from Crypto.PublicKey import RSA               # Generación de claves RSA
from Crypto.Random import get_random_bytes     # Bytes aleatorios seguros
from Crypto.Util.Padding import pad, unpad     # Relleno PKCS#7
```

---

## 🔧 Parámetros configurables

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| `BITS_RSA` | 2048 | Tamaño de la clave RSA en bits |
| `TAM_CLAVE_AES` | 32 bytes | Clave AES de 256 bits |
| `TAM_IV` | 32 bytes | Vector de inicialización |
| `TAM_BLOQUE` | 16 bytes | Tamaño de bloque AES (fijo) |

---

## 🧑‍🎓 Datos académicos

| Campo | Detalle |
|-------|---------|
| 📝 **Práctica** | Práctica 3 — Algoritmo Híbrido |
| 📚 **Materia** | Seguridad Informática |
| 🏫 **Institución** | Facultad de Ingeniería — UACAM |
| 👨‍💻 **Alumno** | Kevin del Jesús González Maas |
| 👨‍🏫 **Docente** | Sergio A. Noh Puch |
| 🎓 **Grado / Grupo** | 7° semestre, Grupo "A" |

---

<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="40"/>
  &nbsp;&nbsp;
  <strong>Hecho con Python</strong> 🐍
  &nbsp;&nbsp;
  <img src="https://img.shields.io/badge/Estado-Funcional_✓-success?style=flat-square"/>
</p>
