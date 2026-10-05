Add-Type -AssemblyName System.Drawing

function Create-RoundedRectanglePath {
    param(
        [System.Drawing.RectangleF]$rect,
        [float]$radius
    )
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    $arc = New-Object System.Drawing.RectangleF $rect.X, $rect.Y, $diameter, $diameter

    # Top-left arc
    $path.AddArc($arc, 180, 90)
    
    # Top-right arc
    $arc.X = $rect.Right - $diameter
    $path.AddArc($arc, 270, 90)
    
    # Bottom-right arc
    $arc.Y = $rect.Bottom - $diameter
    $path.AddArc($arc, 0, 90)
    
    # Bottom-left arc
    $arc.X = $rect.Left
    $path.AddArc($arc, 90, 90)
    
    $path.CloseFigure()
    return $path
}

function Render-AppIcon {
    param(
        [int]$size,
        [string]$outputPath,
        [bool]$isMaskable
    )

    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $cDark1 = [System.Drawing.Color]::FromArgb(255, 30, 41, 59)   # #1e293b
    $cDark2 = [System.Drawing.Color]::FromArgb(255, 15, 23, 42)   # #0f172a
    $cBorder = [System.Drawing.Color]::FromArgb(255, 51, 65, 85)  # #334155
    $cCyan1 = [System.Drawing.Color]::FromArgb(255, 56, 189, 248) # #38bdf8
    $cCyan2 = [System.Drawing.Color]::FromArgb(255, 14, 165, 233) # #0ea5e9
    $cBlue = [System.Drawing.Color]::FromArgb(255, 2, 132, 199)   # #0284c7
    $cLightCyan = [System.Drawing.Color]::FromArgb(255, 125, 211, 252) # #7dd3fc

    if ($isMaskable) {
        # Full-bleed square background
        $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
            (New-Object System.Drawing.PointF 0, 0),
            (New-Object System.Drawing.PointF $size, $size),
            $cDark1,
            $cDark2
        )
        $g.FillRectangle($bgBrush, 0, 0, $size, $size)
        $bgBrush.Dispose()
    } else {
        # Rounded squircle container with border
        $padding = $size * 0.05
        $radius = $size * 0.20
        $rect = New-Object System.Drawing.RectangleF $padding, $padding, ($size - 2 * $padding), ($size - 2 * $padding)
        $bgPath = Create-RoundedRectanglePath $rect $radius

        $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
            (New-Object System.Drawing.PointF 0, 0),
            (New-Object System.Drawing.PointF $size, $size),
            $cDark1,
            $cDark2
        )
        $g.FillPath($bgBrush, $bgPath)
        $borderPen = New-Object System.Drawing.Pen $cBorder, ($size * 0.015)
        $g.DrawPath($borderPen, $bgPath)
        $borderPen.Dispose()
        $bgBrush.Dispose()
        $bgPath.Dispose()
    }

    # Glyph scale & position
    $scale = if ($isMaskable) { 0.76 } else { 0.88 }
    $cx = $size / 2.0
    $cy = $size / 2.0

    function Map-Pt([float]$nx, [float]$ny) {
        $x = $cx + ($nx - 0.5) * $size * $scale
        $y = $cy + ($ny - 0.5) * $size * $scale
        return New-Object System.Drawing.PointF $x, $y
    }

    # Points for isometric layers
    # Diamond top facet
    $pTop = Map-Pt 0.50 0.22
    $pRight = Map-Pt 0.78 0.37
    $pBottom = Map-Pt 0.50 0.52
    $pLeft = Map-Pt 0.22 0.37

    # Middle tier
    $pMidLeft = Map-Pt 0.22 0.52
    $pMidCenter = Map-Pt 0.50 0.67
    $pMidRight = Map-Pt 0.78 0.52

    # Bottom tier
    $pBotLeft = Map-Pt 0.22 0.67
    $pBotCenter = Map-Pt 0.50 0.82
    $pBotRight = Map-Pt 0.78 0.67

    $strokeW = [Math]::Max(3.0, ($size * 0.035))

    # Fill top facet
    $topPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $topPoly = [System.Drawing.PointF[]]@($pTop, $pRight, $pBottom, $pLeft)
    $topPath.AddPolygon($topPoly)

    $cTopFill1 = [System.Drawing.Color]::FromArgb(90, 56, 189, 248)
    $cTopFill2 = [System.Drawing.Color]::FromArgb(30, 2, 132, 199)
    $topBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (
        $pTop, $pBottom, $cTopFill1, $cTopFill2
    )
    $g.FillPath($topBrush, $topPath)
    $topBrush.Dispose()

    # Stroke top facet
    $penCyan1 = New-Object System.Drawing.Pen $cCyan1, $strokeW
    $penCyan1.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $penCyan1.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penCyan1.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawPath($penCyan1, $topPath)
    $topPath.Dispose()

    # Bracket accent inside top facet
    $bStrokeW = [Math]::Max(2.0, ($size * 0.016))
    $bPen = New-Object System.Drawing.Pen $cLightCyan, $bStrokeW
    $bPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $bPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $bPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    # Left bracket <
    $b1 = Map-Pt 0.45 0.34
    $b2 = Map-Pt 0.41 0.37
    $b3 = Map-Pt 0.45 0.40
    $g.DrawLines($bPen, [System.Drawing.PointF[]]@($b1, $b2, $b3))

    # Right bracket >
    $b4 = Map-Pt 0.55 0.34
    $b5 = Map-Pt 0.59 0.37
    $b6 = Map-Pt 0.55 0.40
    $g.DrawLines($bPen, [System.Drawing.PointF[]]@($b4, $b5, $b6))

    # Slash /
    $s1 = Map-Pt 0.52 0.33
    $s2 = Map-Pt 0.48 0.41
    $g.DrawLine($bPen, $s1, $s2)
    $bPen.Dispose()

    # Middle polyline
    $penCyan2 = New-Object System.Drawing.Pen $cCyan2, $strokeW
    $penCyan2.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $penCyan2.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penCyan2.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLines($penCyan2, [System.Drawing.PointF[]]@($pMidLeft, $pMidCenter, $pMidRight))

    # Bottom polyline
    $penBlue = New-Object System.Drawing.Pen $cBlue, $strokeW
    $penBlue.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $penBlue.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $penBlue.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLines($penBlue, [System.Drawing.PointF[]]@($pBotLeft, $pBotCenter, $pBotRight))

    $penCyan1.Dispose()
    $penCyan2.Dispose()
    $penBlue.Dispose()
    $g.Dispose()

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Generated: $outputPath"
}

$iconsDir = Join-Path $PSScriptRoot "icons"
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir | Out-Null
}

Render-AppIcon -size 192 -outputPath (Join-Path $iconsDir "icon-192.png") -isMaskable $false
Render-AppIcon -size 512 -outputPath (Join-Path $iconsDir "icon-512.png") -isMaskable $false
Render-AppIcon -size 192 -outputPath (Join-Path $iconsDir "icon-maskable-192.png") -isMaskable $true
Render-AppIcon -size 512 -outputPath (Join-Path $iconsDir "icon-maskable-512.png") -isMaskable $true

