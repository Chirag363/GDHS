"""PDF download endpoint for serving generated reports."""

from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import FileResponse
import tempfile
import os
from loguru import logger

from agents.pdf_report import pdf_report_agent

router = APIRouter(prefix="/api", tags=["reports"])


@router.post("/generate-pdf-report")
async def generate_pdf_report(analysis_data: dict) -> Response:
    """
    Generate and return a PDF report as a downloadable file.
    
    Args:
        analysis_data: Analysis results from the analyze endpoint
        
    Returns:
        PDF file as downloadable response
    """
    try:
        # Generate PDF
        pdf_bytes = pdf_report_agent.generate_report(analysis_data)
        
        # Return PDF as response
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=orthoassist_report_{analysis_data.get('request_id', 'unknown')}.pdf"
            }
        )
        
    except Exception as e:
        logger.error(f"Failed to generate PDF report: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate PDF report: {str(e)}"
        )


@router.get("/download-pdf/{request_id}")
async def download_pdf_report(request_id: str):
    """
    Download a PDF report by request ID.
    
    This would typically fetch analysis data from storage and generate PDF.
    For now, it generates a sample report.
    """
    try:
        # In a real implementation, you'd fetch the analysis data from storage
        # For now, we'll create sample data
        sample_data = {
            "request_id": request_id,
            "triage": {
                "level": "AMBER",
                "confidence": 0.72,
                "body_part": "hand",
                "detections": [{"class": "Fracture", "confidence": 0.72}]
            },
            "cloudinary_urls": {
                "original_image_url": "https://example.com/original.jpg",
                "annotated_image_url": "https://example.com/annotated.jpg"
            }
        }
        
        # Generate PDF
        pdf_bytes = pdf_report_agent.generate_report(sample_data)
        
        # Return PDF as response
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=orthoassist_report_{request_id}.pdf"
            }
        )
        
    except Exception as e:
        logger.error(f"Failed to download PDF report: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to download PDF report: {str(e)}"
        )