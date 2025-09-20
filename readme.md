# 🦴 Orthopedic Assistant MCP (OrthoAssist)

## 📌 Overview
**OrthoAssist** is an **MCP-based platform** where X-rays meet artificial intelligence to transform orthopedic care.  
It enables doctors, health workers, and patients to **analyze musculoskeletal X-rays in real-time**, detect fractures, classify their severity, and generate **easy-to-understand medical reports** within minutes.  

By combining **YOLO-based fracture detection** with a **Groq-powered LLM for natural language reporting**, OrthoAssist reduces diagnosis time from **hours to just minutes**, making orthopedic expertise **accessible anytime, anywhere** — even in rural and under-resourced areas.  

---

## 🚀 Features
- 📷 **X-ray Analysis** – Supports hand & leg X-rays in JPG, PNG, and DICOM formats.  
- 🤖 **Fracture Detection** – Identifies multiple fracture types with high accuracy.  
- 🩺 **Triage System** – Severity classification into **Red / Amber / Green**.  
- 📝 **Medical Reports** – AI-generated patient-friendly summaries with recommendations.  
- 🌐 **Web Dashboard** – Upload, analyze, and download annotated reports.  
- 🔒 **Secure & Compliant** – PHI redaction, encryption, and medical disclaimers.  

---

## 🏗 Architecture
**Core Components:**
- **MCP Server** – Model Context Protocol implementation.  
- **FastAPI Backend** – Request orchestration & workflow management.  
- **AI Agents** – YOLO fracture detection (hand & leg), Groq LLM diagnosis.  
- **Frontend Dashboard** – Upload, preview, and visualize results.  
- **Storage System** – Secure file management with audit logs.  

**Workflow:**  
1. Upload X-ray → Input Validation  
2. Body Part Detection → Fracture Detection  
3. Triage Assessment → LLM-based Medical Summary  
4. PDF Report Generation → Download/Save  

---

## ⚙️ Tech Stack
- **Backend:** FastAPI, Python  
- **AI Models:** YOLO (PyTorch), Groq LLM  
- **Frontend:** HTML / CSS / JS (or React for expansion)  
- **Database/Storage:** Local/Cloud Encrypted Storage  
- **Deployment:** Docker, GPU/CPU fallback  

---

## 📊 Comparison with Existing Works
Unlike existing research (FracAtlas dataset, AI Expert Systems, and medico-legal imaging), OrthoAssist is **end-to-end deployable** with:  
- ✅ Real-time inference  
- ✅ Patient-friendly outputs  
- ✅ Severity-based triage  
- ✅ Secure compliance  

---

## 🌟 Use Cases
- 🏥 **Hospitals & Clinics** – Reduce workload of radiologists.  
- 🌍 **Rural Healthcare** – Enable diagnosis without waiting for specialists.  
- ⚖️ **Medico-Legal Support** – Provide objective diagnostic evidence.  
- 📚 **Medical Training** – Educational tool for students and researchers.  

---



