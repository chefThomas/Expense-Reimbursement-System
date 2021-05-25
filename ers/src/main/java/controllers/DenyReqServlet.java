package controllers;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import repository.models.Reimbursement;
import services.ReimbursementService;
import utils.JsonConverter;

@WebServlet(name = "deny-request", urlPatterns = { "/main/deny-request" })
public class DenyReqServlet extends HttpServlet {

    private ReimbursementService rService = new ReimbursementService();

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        String id = req.getParameter("id");
        String manId = req.getParameter("manId");

        System.out.println("req.getParamter( )");
        System.out.println(id);
        System.out.println(manId);

        Cookie[] cookies = req.getCookies();

        if (cookies != null) {
            // convert to ArrayList for methods
            List<Cookie> cookieList = Arrays.asList(cookies);

            // get userRole cookie
            Cookie result = cookieList.stream().filter(cookie -> cookie.getName().equals("userRole")).findAny()
                    .orElse(null);

            // if employee, get id from userId cookie
            if (result.getValue().equals("1")) {

                Reimbursement reimbursement = rService.denyReq(Integer.parseInt(req.getParameter("id")),
                        Integer.parseInt(req.getParameter("manId")));
                // set output type for message
                res.setContentType("application/json;charset=UTF-8");
                ServletOutputStream jsonOut = res.getOutputStream();

                JsonConverter converter = new JsonConverter();
                String output = converter.convertToJson(reimbursement);
                jsonOut.print(output);
            }

        }
    }

}
