copy "package.json" "dist\package.json" 
copy "package-lock.json" "dist\package-lock.json"
copy "index.js" "dist\index.js"
echo F| Xcopy "db\dataAccessLayer.js" "dist\db\dataAccessLayer.js"
Xcopy /I /S /E "static" "dist\static"
Xcopy /I /S /E "pages" "dist\pages"
Xcopy /I /S /E "modules" "dist\modules"
ECHO "Done"