package repository.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import repository.models.Reimbursement;
import repository.models.User;
import utils.ConnectionFactory;

public class ReimbursementDaoImpl implements ReimbursementDao {

    @Override
    public Reimbursement add(Reimbursement u) {
        Reimbursement result = null;
        String sql = "insert into reimbursement (amount, description, author_id, reimbursement_type_id) values (?, ?, ?, ? ) returning *";
        try (Connection con = ConnectionFactory.getConnection()) {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setDouble(1, u.getAmount());
            ps.setString(2, u.getDescription());
            ps.setInt(3, u.getAuthorId());
            ps.setInt(4, u.getReimbursementTypeId());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                Reimbursement r = new Reimbursement(rs.getInt("id"), rs.getDouble("amount"), rs.getString("submitted"),
                        rs.getString("description"), rs.getInt("author_id"), rs.getInt("status_id"),
                        rs.getInt("reimbursement_type_id"));
                result = r;
            }
        } catch (SQLException e) {
            System.out.println("ReimbursementDoaImpl: add");
            e.printStackTrace();
        }
        return result;

    }

    @Override
    public List<Reimbursement> getAllByEmp(User u) {
        List<Reimbursement> result = new ArrayList<Reimbursement>();
        // sql
        String sql = "select r.*, rt.\"expense_type\", rs.\"status\" as \"status\", u2.first_name as author_first_name, u2.last_name as author_last_name, u.first_name as resolver_first_name, u.last_name as resolver_last_name from reimbursement r full join reimbursement_type rt on reimbursement_type_id = rt.id full join users u on r.resolver_id = u.id full join users u2 on r.author_id = u2.id full join reimbursement_status rs on r.status_id = rs.id where r.author_id =?";
        // preparedstatment
        try (Connection con = ConnectionFactory.getConnection()) {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, u.getId());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Reimbursement r = new Reimbursement(rs.getInt("id"), rs.getDouble("amount"), rs.getString("submitted"),
                        rs.getString("resolved"), rs.getString("description"), rs.getString("receipt"),
                        rs.getInt("author_id"), rs.getInt("resolver_id"), rs.getInt("status_id"),
                        rs.getInt("reimbursement_type_id"), rs.getString("expense_type"), rs.getString("status"),
                        rs.getString("resolver_first_name"), rs.getString("resolver_last_name"),
                        rs.getString("author_first_name"), rs.getString("author_last_name"));
                result.add(r);
            }
        } catch (SQLException e) {
            System.out.println("ReimbursementDoaImpl: getAllByEmp");
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public List<Reimbursement> getAll() {
        List<Reimbursement> result = new ArrayList<Reimbursement>();
        // sql
        String sql = "select r.*, rt.\"expense_type\", rs.\"status\" as \"status\", u2.first_name as author_first_name, u2.last_name as author_last_name, u.first_name as resolver_first_name, u.last_name as resolver_last_name from reimbursement r full join reimbursement_type rt on reimbursement_type_id = rt.id full join users u on r.resolver_id = u.id full join users u2 on r.author_id = u2.id full join reimbursement_status rs on r.status_id = rs.id where r.author_id notnull";
        // preparedstatment
        try (Connection con = ConnectionFactory.getConnection()) {
            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Reimbursement r = new Reimbursement(rs.getInt("id"), rs.getDouble("amount"), rs.getString("submitted"),
                        rs.getString("resolved"), rs.getString("description"), rs.getString("receipt"),
                        rs.getInt("author_id"), rs.getInt("resolver_id"), rs.getInt("status_id"),
                        rs.getInt("reimbursement_type_id"), rs.getString("expense_type"), rs.getString("status"),
                        rs.getString("resolver_first_name"), rs.getString("resolver_last_name"),
                        rs.getString("author_first_name"), rs.getString("author_last_name"));
                result.add(r);
            }
        } catch (SQLException e) {
            System.out.println("ReimbursementDoaImpl: getAll");
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public Reimbursement get(Reimbursement i) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Reimbursement approve(int id, int manId) {
        Reimbursement result = null;
        String sql = "update reimbursement r set status_id = (select id from reimbursement_status where status = 'approved' ), resolved = now(), resolver_id = ? where r.id  = ? returning r.id";

        try (Connection con = ConnectionFactory.getConnection()) {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, manId);
            ps.setInt(2, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Reimbursement r = new Reimbursement(rs.getInt("id"));
                result = r;
            }
        } catch (SQLException e) {
            System.out.println("ReimbursementDoaImpl: approve");
            e.printStackTrace();
        }
        return result;

    }

    @Override
    public Reimbursement deny(int id, int manId) {

        Reimbursement result = null;
        String sql = "update reimbursement r set status_id = (select id from reimbursement_status where status = 'denied' ), resolved = now(), resolver_id = ? where r.id  = ? returning r.id";

        try (Connection con = ConnectionFactory.getConnection()) {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, manId);
            ps.setInt(2, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Reimbursement r = new Reimbursement(rs.getInt("id"));
                result = r;
            }
        } catch (SQLException e) {
            System.out.println("ReimbursementDoaImpl: deny");
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public int remove(Reimbursement i) {
        // TODO Auto-generated method stub
        return 0;
    }

}
